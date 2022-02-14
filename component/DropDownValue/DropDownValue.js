import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import styles from './DropDownValue.module.scss'
import PropTypes from 'prop-types'
import { InputAdornment } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
export default function DropDownValue({ setEventCB = () => { }, id, placeholder, options, value, setCB, inputRef = null, ...props }) {
  const renderLabel = (option) => {
    let finalName = ''
    switch (id) {
      case 'first_name':
        finalName = option.name || `${option.first_name} ${option.last_name}`
        break
      default:
        finalName = option.name || ''
    }
    return finalName.includes('undefined') ? '' : finalName
  }
  return (
    <Autocomplete
      className={[styles.Autocomplete].join(' ')}
      id={id}
      options={options}
      getOptionLabel={(option) => renderLabel(option)}
      value={{ name: value }}
      onChange={(event, newValue) => {
        if (newValue.name === value) {
          setCB({ name: '' })
        } else {
          setCB(newValue)
        }
      }}
      disableClearable
      renderOption={(option) => {
        return (
          <div className={value === option.name && styles.selected}>
            {renderLabel(option)}
          </div>
        )
      }}
      renderInput={(params) =>
        <TextField
          inputRef={inputRef}
          onChange={(e) => {
            setEventCB(e)
          }}
          {...params}
          placeholder={value?.length > 0 ? ' ' : placeholder}
          className={[styles.TextField, styles.margin_top_10].join(' ')}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            autocomplete: 'new-password',
            form: {
              autocomplete: 'off',
            },
            endAdornment: (
              <InputAdornment position={"start"}>
                <ArrowDropDown className={styles.icon_size} />
              </InputAdornment>
            )
          }}
        />
      }
      {...props}
    />
  );
}

DropDownValue.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  setCB: PropTypes.func,
  setEventCB: PropTypes.func,
  inputRef: PropTypes.any
};