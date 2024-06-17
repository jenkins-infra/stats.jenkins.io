import { useState, useMemo } from 'react'
import {
    Stack,
    Pagination,
    CircularProgress,
    TextField,
    Box,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
} from '@mui/material'
import NavBar from '../../components/Layout/NavBar'
import useFetchAndFilterPlugins from '../../hooks/useFetchAndFilterPlugins'
import useSortPlugins from '../../hooks/useSortPlugins'
import usePagination from '../../hooks/usePagination'
import PluginCard from '../../components/PluginTrends/Layout/PluginCard'
import { SortOption } from '../../data/types'

const PluginTrends: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const { filteredPlugins, loading } = useFetchAndFilterPlugins(searchTerm)
    const { sortOption, setSortOption } = useSortPlugins(filteredPlugins)
    const itemsPerPage = 64

    const { page, handlePageChange, paginatedData, totalPages } = usePagination(filteredPlugins, itemsPerPage)

    // Generate options for Autocomplete
    const pluginOptions = useMemo(() => filteredPlugins.map((plugin) => plugin.id), [filteredPlugins])

    // Custom filter function to show suggestions only after typing at least one character
    const filterOptions = (options: string[], { inputValue }: { inputValue: string }) => {
        return inputValue.length === 0 ? [] : options
    }

    return (
        <Stack
            sx={{
                backgroundColor: '#f0f0f0',
                minHeight: '100vh',
                minWidth: '100vw',
            }}
        >
            <NavBar />
            <Box
                sx={{
                    marginTop: '2.5rem',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2rem',
                    width: '100%',
                }}
            >
                <Box sx={{ minWidth: 300 }}>
                    <Autocomplete
                        freeSolo
                        options={pluginOptions}
                        filterOptions={filterOptions}
                        onInputChange={(event, value) => setSearchTerm(value)}
                        renderInput={(params) => <TextField {...params} label="Search Plugins" variant="standard" />}
                    />
                </Box>
                <Box>
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            label="Sort By"
                        >
                            <MenuItem value="alphabetical">A - Z</MenuItem>
                            <MenuItem value="downloadsHighToLow">Installations: High to Low</MenuItem>
                            <MenuItem value="downloadsLowToHigh">Installations: Low to High</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <Grid
                        container
                        spacing={3}
                        sx={{
                            padding: '4rem',
                            paddingTop: '1rem',
                            marginTop: '0',
                        }}
                    >
                        {paginatedData.map((plugin) => (
                            <Grid item xs={6} sm={4} md={3} xl={2} key={plugin.id}>
                                <PluginCard plugin={plugin} />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={totalPages}
                        page={page}
                        shape="rounded"
                        onChange={handlePageChange}
                        color="primary"
                        sx={{ marginTop: '2rem', marginBottom: '4rem', display: 'flex', justifyContent: 'center' }}
                    />
                </>
            )}
        </Stack>
    )
}

export default PluginTrends

// import { useState } from 'react'
// import {
//     Stack,
//     Pagination,
//     CircularProgress,
//     TextField,
//     Box,
//     Grid,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
// } from '@mui/material'
// import NavBar from '../../components/Layout/NavBar'
// import useFetchAndFilterPlugins from '../../hooks/useFetchAndFilterPlugins'
// import useSortPlugins from '../../hooks/useSortPlugins'
// import usePagination from '../../hooks/usePagination'
// import PluginCard from '../../components/PluginTrends/Layout/PluginCard'
// import { SortOption } from '../../data/types'

// const PluginTrends: React.FC = () => {
//     const [searchTerm, setSearchTerm] = useState<string>('')
//     const { filteredPlugins, loading } = useFetchAndFilterPlugins(searchTerm)
//     const { sortOption, setSortOption } = useSortPlugins(filteredPlugins)
//     const itemsPerPage = 64

//     const { page, handlePageChange, paginatedData, totalPages } = usePagination(filteredPlugins, itemsPerPage)

//     return (
//         <Stack
//             sx={{
//                 backgroundColor: '#f0f0f0',
//                 minHeight: '100vh',
//                 minWidth: '100vw',
//             }}
//         >
//             <NavBar />
//             <Box
//                 sx={{
//                     marginTop: '2.5rem',
//                     display: 'flex',
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     gap: '2rem',
//                     width: '100%',
//                 }}
//             >
//                 <Box>
//                     <TextField
//                         label="Search Plugins"
//                         variant="standard"
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </Box>
//                 <Box>
//                     <FormControl variant="standard" sx={{ minWidth: 120 }}>
//                         <InputLabel>Sort By</InputLabel>
//                         <Select
//                             value={sortOption}
//                             onChange={(e) => setSortOption(e.target.value as SortOption)}
//                             label="Sort By"
//                         >
//                             <MenuItem value="alphabetical">A - Z</MenuItem>
//                             <MenuItem value="downloadsHighToLow">Installations: High to Low</MenuItem>
//                             <MenuItem value="downloadsLowToHigh">Installations: Low to High</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Box>
//             </Box>
//             {loading ? (
//                 <CircularProgress />
//             ) : (
//                 <>
//                     <Grid
//                         container
//                         spacing={3}
//                         sx={{
//                             padding: '4rem',
//                             paddingTop: '1rem',
//                             marginTop: '0',
//                         }}
//                     >
//                         {paginatedData.map((plugin) => (
//                             <Grid item xs={6} sm={4} md={3} xl={2} key={plugin.id}>
//                                 <PluginCard plugin={plugin} />
//                             </Grid>
//                         ))}
//                     </Grid>
//                     <Pagination
//                         count={totalPages}
//                         page={page}
//                         shape="rounded"
//                         onChange={handlePageChange}
//                         color="primary"
//                         sx={{ marginTop: '2rem', marginBottom: '4rem', display: 'flex', justifyContent: 'center' }}
//                     />
//                 </>
//             )}
//         </Stack>
//     )
// }

// export default PluginTrends
