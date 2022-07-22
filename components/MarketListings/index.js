import { useEffect, useRef, useState } from 'react'
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { TuneRounded as FilterIcon } from '@mui/icons-material'
import { useScreenSize } from '../../contexts/ScreenSizeContext'
import { useMarket } from '../../contexts/MarketContext'
import Modal from '../Modal'
import Loader from '../Loader'
import BaseButton from '../BaseButton'
import AssetCard from '../AssetCard'
import foxTraitsJsonFile from '../../data/traits/fox'
import styles from './MarketListings.module.css'
import Toggle from '../Toggle'

const TRAITS_MATRIX = Object.entries(foxTraitsJsonFile).sort((a, b) => a[0].localeCompare(b[0]))
const INITIAL_DISPLAY_AMOUNT = 20

function MarketListings() {
  const { isMobile } = useScreenSize()
  const { fetchAndSetAllFoxes, allListedFoxes } = useMarket()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!allListedFoxes.length) {
      ;(async () => {
        setLoading(true)
        await fetchAndSetAllFoxes()
        setLoading(false)
      })()
    }
  }, [])

  const [ascending, setAscending] = useState(true)
  const [sortByPrice, setSortByPrice] = useState(true)

  const [openFilters, setOpenFilters] = useState(false)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(
    (() => {
      const payload = {}

      TRAITS_MATRIX.forEach(([cat]) => {
        payload[cat] = []
      })

      return payload
    })()
  )

  const [displayNum, setDisplayNum] = useState(INITIAL_DISPLAY_AMOUNT)
  const bottomRef = useRef(null)

  useEffect(() => {
    const handleScroll = (e) => {
      const { pageYOffset, innerHeight } = e.composedPath()[1]
      const isScrolledToBottom = bottomRef.current?.offsetTop <= pageYOffset + innerHeight

      if (isScrolledToBottom) {
        setDisplayNum((prev) => prev + INITIAL_DISPLAY_AMOUNT)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const renderAssets = () => {
    const selected = []

    Object.entries(filters).forEach(([cat, selections]) => {
      if (selections.length) {
        selected.push([cat, selections])
      }
    })

    return allListedFoxes
      .filter((item) => {
        const matchingCategories = []

        selected.forEach(([cat, selections]) => {
          let categoryMatch = false

          if (selections.includes(item.attributes[cat])) {
            categoryMatch = true
          }

          if (categoryMatch) {
            matchingCategories.push(cat)
          }
        })

        return matchingCategories.length === selected.length
      })
      .filter((item) => !search || (search && item.name.indexOf(search) !== -1))
      .sort((a, b) =>
        ascending && sortByPrice
          ? a.price - b.price
          : !ascending && sortByPrice
          ? b.price - a.price
          : ascending && !sortByPrice
          ? a.rank - b.rank
          : !ascending && !sortByPrice
          ? b.rank - a.rank
          : 0
      )
  }

  return (
    <div className='flex-col'>
      <div className={styles.optionsWrapper}>
        <div className={styles.togglesWrapper}>
          <div className='flex-col'>
            {!isMobile ? (ascending ? 'Ascend' : 'Descend') : null}
            <Toggle
              labelLeft={isMobile ? 'Descend' : ''}
              labelRight={isMobile ? 'Ascend' : ''}
              showIcons={false}
              state={{ value: ascending, setValue: setAscending }}
              style={{ margin: isMobile ? '0.5rem 0.3rem' : '0 0.3rem' }}
            />
          </div>
          <div className='flex-col'>
            {!isMobile ? (sortByPrice ? 'Price' : 'Rank') : null}
            <Toggle
              labelLeft={isMobile ? 'Rank' : ''}
              labelRight={isMobile ? 'Price' : ''}
              showIcons={false}
              state={{ value: sortByPrice, setValue: setSortByPrice }}
              style={{ margin: isMobile ? '0.5rem 0.3rem' : '0 0.3rem' }}
            />
          </div>
        </div>

        <div>
          <BaseButton
            label='Filter Attributes'
            onClick={() => setOpenFilters((prev) => !prev)}
            icon={FilterIcon}
            style={{
              width: 'calc(60% - 0.5rem)',
              marginRight: '0.5rem',
              backgroundColor: 'var(--brown)',
            }}
            hoverColor='var(--orange)'
          />
          <TextField
            label='Search by #ID'
            placeholder='4949'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '40%' }}
          />
        </div>
      </div>

      <Modal
        title='Filter Attributes'
        open={openFilters}
        onClose={() => setOpenFilters((prev) => !prev)}
        style={{ backgroundColor: 'var(--charcoal)' }}
      >
        <div className={styles.listOfFilters}>
          {TRAITS_MATRIX.map(([category, traits], idx1) => (
            <div key={`market-category-${category}-${idx1}`}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>{category}</InputLabel>
                <Select
                  multiple
                  value={filters[category]}
                  onChange={(e) => {
                    const value = e.target.value
                    setFilters((prev) => ({
                      ...prev,
                      [category]: typeof value === 'string' ? value.split(',') : value,
                    }))
                  }}
                  input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {traits.map((obj, idx2) => {
                    const trait = `${obj.gender === 'Male' ? '(M)' : obj.gender === 'Female' ? '(F)' : '(U)'} ${
                      obj.label
                    }`

                    return (
                      <MenuItem key={`market-category-attribute-${obj.label}-${idx2}`} value={trait}>
                        {trait}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
          ))}
        </div>
      </Modal>

      <div className={`scroll ${styles.listOfAssets}`}>
        {renderAssets().map((item, idx) =>
          idx < displayNum ? (
            <AssetCard
              key={`market-listing-${item.assetId}-${idx}`}
              name={item.name}
              rank={item.rank}
              price={item.price}
              imageSrc={item.imageUrl}
              itemUrl={item.itemUrl}
              tableRows={Object.entries(item.attributes)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([cat, attr]) => [
                  `${cat}:`,
                  attr,
                  cat === 'Gender'
                    ? '50%'
                    : foxTraitsJsonFile[cat === 'Skin' ? `${cat} + Tail` : cat].find(
                        (obj) => obj.label === attr.replace('(F) ', '').replace('(M) ', '').replace('(U) ', '')
                      )?.percent,
                ])}
            />
          ) : null
        )}
      </div>

      {loading ? <Loader /> : null}
      <div ref={bottomRef} />
    </div>
  )
}

export default MarketListings
