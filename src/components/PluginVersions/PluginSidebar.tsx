import React, { useState } from 'react'
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    IconButton,
    styled,
    TextField,
    Autocomplete,
    Paper,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { pluginList } from '../../data/plugins'

const ListButton = styled(ListItemButton)({
    '&.Mui-selected': {
        backgroundImage: 'linear-gradient(315deg, #007FFF 0%, #005BBB 74%)',
    },
    '&:hover': {
        backgroundImage: 'linear-gradient(315deg, #CCCCCC 0%, #AAAAAA 74%)',
    },
    borderRadius: '0.5rem',
    width: '90%',
    margin: 'auto',
})

const ListText = styled(ListItemText)({
    color: 'white',
    fontFamily: 'Georgia',
    fontWeight: 'bold',
})

const drawerWidthOpen = '20rem'
const drawerWidthClosed = '4rem'

interface PluginSidebarProps {
    searchTerm: string
    // eslint-disable-next-line no-unused-vars
    setSearchTerm: (term: string) => void
    // eslint-disable-next-line no-unused-vars
    handleSearch: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    // eslint-disable-next-line no-unused-vars
    handleAutocompleteChange: (_event: unknown, value: string | null) => void
    filteredPlugins: Array<{ id: string }>
    // eslint-disable-next-line no-unused-vars
    onPluginSelect: (pluginId: string) => void
}

const PluginSidebar: React.FC<PluginSidebarProps> = ({
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleAutocompleteChange,
    filteredPlugins,
    onPluginSelect,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleItemClick = (callback: () => void) => {
        callback()
        setSidebarOpen(false)
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const plugin = filteredPlugins.find((plugin) => plugin.id.toLowerCase() === searchTerm.toLowerCase())
            if (plugin) {
                handleItemClick(() => onPluginSelect(plugin.id))
            }
        }
    }

    return (
        <>
            <Box
                sx={{
                    width: '2.5rem',
                    height: '100%',
                    backgroundColor: '#212529',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '0.5rem',
                    cursor: 'pointer',
                }}
                onClick={toggleSidebar}
            >
                <MenuIcon sx={{ color: 'white' }} />
            </Box>

            <Drawer
                variant="temporary"
                anchor="left"
                open={sidebarOpen}
                onClose={toggleSidebar}
                sx={{
                    width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
                        boxSizing: 'border-box',
                        backgroundColor: '#212529',
                        transition: 'width 0.3s',
                        position: 'relative',
                        left: 0,
                    },
                }}
            >
                <Box sx={{ position: 'sticky', top: 0, backgroundColor: '#212529', zIndex: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            backgroundColor: 'inherit',
                            padding: '0.5rem',
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="toggle drawer"
                            edge="start"
                            onClick={toggleSidebar}
                            sx={{ color: 'white' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ padding: '8px' }}>
                        <Autocomplete
                            freeSolo
                            options={pluginList.map((plugin) => plugin.id)}
                            onChange={(event, value) => {
                                handleAutocompleteChange(event, value)
                                if (value) {
                                    handleItemClick(() => onPluginSelect(value))
                                    setSearchTerm('')
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Plugins"
                                    variant="standard"
                                    margin="none"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        handleSearch(e)
                                        setSearchTerm(e.target.value)
                                    }}
                                    onKeyPress={handleKeyPress}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: '#212529',
                                    }}
                                    InputLabelProps={{
                                        style: { color: 'white' },
                                    }}
                                    InputProps={{
                                        ...params.InputProps,
                                        style: { color: 'white' },
                                        disableUnderline: true,
                                        startAdornment: (
                                            <Box
                                                sx={{
                                                    height: '2px',
                                                    backgroundColor: 'white',
                                                    position: 'absolute',
                                                    bottom: '0px',
                                                    left: '0',
                                                    right: '0',
                                                }}
                                            />
                                        ),
                                    }}
                                />
                            )}
                            PaperComponent={({ children }) => (
                                <Paper
                                    sx={{
                                        width: '80%',
                                        backgroundColor: '#636363',
                                        color: 'white',
                                        '& .MuiAutocomplete-option': {
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#b0b0b0',
                                            },
                                        },
                                    }}
                                >
                                    {children}
                                </Paper>
                            )}
                            sx={{
                                width: '100%',
                            }}
                        />
                    </Box>
                </Box>

                {sidebarOpen && (
                    <List>
                        {filteredPlugins.map((plugin) => (
                            <ListButton
                                key={plugin.id}
                                onClick={() => handleItemClick(() => onPluginSelect(plugin.id))}
                            >
                                <ListText primary={plugin.id} />
                            </ListButton>
                        ))}
                    </List>
                )}
            </Drawer>
        </>
    )
}

export default PluginSidebar

// import React, { useState } from 'react'
// import {
//     Box,
//     Drawer,
//     List,
//     ListItemButton,
//     ListItemText,
//     IconButton,
//     styled,
//     TextField,
//     Autocomplete,
//     Paper,
// } from '@mui/material'
// import MenuIcon from '@mui/icons-material/Menu'
// import { pluginList } from '../../data/plugins'

// const ListButton = styled(ListItemButton)({
//     '&.Mui-selected': {
//         backgroundImage: 'linear-gradient(315deg, #007FFF 0%, #005BBB 74%)',
//     },
//     '&:hover': {
//         backgroundImage: 'linear-gradient(315deg, #CCCCCC 0%, #AAAAAA 74%)',
//     },
//     borderRadius: '0.5rem',
//     width: '90%',
//     margin: 'auto',
// })

// const ListText = styled(ListItemText)({
//     color: 'white',
//     fontFamily: 'Georgia',
//     fontWeight: 'bold',
// })

// const drawerWidthOpen = '20rem'
// const drawerWidthClosed = '4rem'

// interface PluginSidebarProps {
//     searchTerm: string
//     // eslint-disable-next-line no-unused-vars
//     setSearchTerm: (term: string) => void
//     // eslint-disable-next-line no-unused-vars
//     handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
//     // eslint-disable-next-line no-unused-vars
//     handleAutocompleteChange: (_event: unknown, value: string | null) => void
//     filteredPlugins: Array<{ id: string }>
//     // eslint-disable-next-line no-unused-vars
//     onPluginSelect: (pluginId: string) => void
// }

// const PluginSidebar: React.FC<PluginSidebarProps> = ({
//     searchTerm,
//     setSearchTerm,
//     handleSearch,
//     handleAutocompleteChange,
//     filteredPlugins,
//     onPluginSelect,
// }) => {
//     const [sidebarOpen, setSidebarOpen] = useState(false)

//     const toggleSidebar = () => {
//         setSidebarOpen(!sidebarOpen)
//     }

//     const handleItemClick = (callback: () => void) => {
//         callback()
//         setSidebarOpen(false)
//     }

//     const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter') {
//             const plugin = filteredPlugins.find((plugin) => plugin.id.toLowerCase() === searchTerm.toLowerCase())
//             if (plugin) {
//                 handleItemClick(() => onPluginSelect(plugin.id))
//             }
//         }
//     }

//     return (
//         <>
//             <Box
//                 sx={{
//                     width: '2.5rem',
//                     height: '100%',
//                     backgroundColor: '#212529',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     padding: '0.5rem',
//                     cursor: 'pointer',
//                 }}
//                 onClick={toggleSidebar}
//             >
//                 <MenuIcon sx={{ color: 'white' }} />
//             </Box>

//             <Drawer
//                 variant="temporary"
//                 anchor="left"
//                 open={sidebarOpen}
//                 onClose={toggleSidebar}
//                 sx={{
//                     width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
//                     flexShrink: 0,
//                     '& .MuiDrawer-paper': {
//                         width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
//                         boxSizing: 'border-box',
//                         backgroundColor: '#212529',
//                         transition: 'width 0.3s',
//                         position: 'relative',
//                         left: 0,
//                     },
//                 }}
//             >
//                 <Box sx={{ position: 'sticky', top: 0, backgroundColor: '#212529', zIndex: 1 }}>
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             justifyContent: 'flex-end',
//                             backgroundColor: 'inherit',
//                             padding: '0.5rem',
//                         }}
//                     >
//                         <IconButton
//                             color="inherit"
//                             aria-label="toggle drawer"
//                             edge="start"
//                             onClick={toggleSidebar}
//                             sx={{ color: 'white' }}
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                     </Box>
//                     <Box sx={{ padding: '8px' }}>
//                         <Autocomplete
//                             freeSolo
//                             options={pluginList.map((plugin) => plugin.id)}
//                             onChange={(event, value) => {
//                                 handleAutocompleteChange(event, value)
//                                 if (value) {
//                                     handleItemClick(() => onPluginSelect(value))
//                                     setSearchTerm('')
//                                 }
//                             }}
//                             renderInput={(params) => (
//                                 <TextField
//                                     {...params}
//                                     label="Search Plugins"
//                                     variant="standard"
//                                     margin="none"
//                                     value={searchTerm}
//                                     onChange={(e) => {
//                                         handleSearch(e)
//                                         setSearchTerm(e.target.value)
//                                     }}
//                                     onKeyPress={handleKeyPress}
//                                     sx={{
//                                         color: 'white',
//                                         backgroundColor: '#212529',
//                                     }}
//                                     InputLabelProps={{
//                                         style: { color: 'white' },
//                                     }}
//                                     InputProps={{
//                                         ...params.InputProps,
//                                         style: { color: 'white' },
//                                         disableUnderline: true,
//                                         startAdornment: (
//                                             <Box
//                                                 sx={{
//                                                     height: '2px',
//                                                     backgroundColor: 'white',
//                                                     position: 'absolute',
//                                                     bottom: '0px',
//                                                     left: '0',
//                                                     right: '0',
//                                                 }}
//                                             />
//                                         ),
//                                     }}
//                                 />
//                             )}
//                             PaperComponent={({ children }) => (
//                                 <Paper
//                                     sx={{
//                                         width: '80%',
//                                         backgroundColor: '#636363',
//                                         color: 'white',
//                                         '& .MuiAutocomplete-option': {
//                                             color: 'white',
//                                             '&:hover': {
//                                                 backgroundColor: '#b0b0b0',
//                                             },
//                                         },
//                                     }}
//                                 >
//                                     {children}
//                                 </Paper>
//                             )}
//                             sx={{
//                                 width: '100%',
//                             }}
//                         />
//                     </Box>
//                 </Box>

//                 {sidebarOpen && (
//                     <List>
//                         {filteredPlugins.map((plugin) => (
//                             <ListButton
//                                 key={plugin.id}
//                                 onClick={() => handleItemClick(() => onPluginSelect(plugin.id))}
//                             >
//                                 <ListText primary={plugin.id} />
//                             </ListButton>
//                         ))}
//                     </List>
//                 )}
//             </Drawer>
//         </>
//     )
// }

// export default PluginSidebar
