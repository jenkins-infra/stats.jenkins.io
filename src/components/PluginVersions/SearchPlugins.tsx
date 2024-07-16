import React, { useState } from 'react'
import {
    Paper,
    TextField,
    Autocomplete,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { Plugin } from '../../types/types'
import useIsMobile from '../../hooks/useIsMobile'

interface SearchBarProps {
    searchTerm: string
    pluginList: { id: string }[]
    selectedPlugin: Plugin | null
    // eslint-disable-next-line no-unused-vars
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    // eslint-disable-next-line no-unused-vars
    onAutocompleteChange: (_: unknown, value: string | null) => void
    // eslint-disable-next-line no-unused-vars
    onDropdownChange: (event: SelectChangeEvent<string>) => void
}

const renderRow = ({ index, style, data }: ListChildComponentProps) => {
    const plugin = data[index]
    return (
        <MenuItem
            key={plugin.id}
            value={plugin.id}
            style={style}
            onClick={() => data.onDropdownChange({ target: { value: plugin.id } } as SelectChangeEvent<string>)}
        >
            {plugin.id}
        </MenuItem>
    )
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    pluginList,
    selectedPlugin,
    onSearchChange,
    onAutocompleteChange,
    onDropdownChange,
}) => {
    const isMobile = useIsMobile()
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        onSearchChange(event)
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                marginBottom: '2rem',
                gap: '1rem',
            }}
        >
            <Autocomplete
                freeSolo
                options={pluginList.map((plugin) => plugin.id)}
                onChange={onAutocompleteChange}
                inputValue={inputValue}
                onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
                open={inputValue.length > 0}
                PaperComponent={(props) => <Paper {...props} elevation={8} />}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Plugins"
                        variant="standard"
                        value={searchTerm}
                        onChange={handleInputChange}
                        sx={{ minWidth: '200px' }}
                    />
                )}
                sx={{ width: '25%', minWidth: '200px' }}
            />
            <FormControl variant="standard" sx={{ width: '25%', minWidth: '200px' }}>
                <InputLabel id="plugin-select-label">Select Plugin</InputLabel>
                <Select
                    labelId="plugin-select-label"
                    id="plugin-select"
                    value={selectedPlugin ? selectedPlugin.id : ''}
                    onChange={onDropdownChange}
                    label="Select Plugin"
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                maxHeight: '70%',
                            },
                        },
                    }}
                >
                    <FixedSizeList
                        height={384}
                        width={'100%'}
                        itemSize={46}
                        itemCount={pluginList.length}
                        itemData={{ ...pluginList, onDropdownChange }}
                        style={{
                            display: 'flex',
                            flexGrow: 1,
                            minWidth: '250px',
                        }}
                    >
                        {renderRow}
                    </FixedSizeList>
                </Select>
            </FormControl>
        </Box>
    )
}

export default SearchBar
