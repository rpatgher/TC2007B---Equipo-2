
const lightTheme = {
    components: {
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    color: 'var(--gray)',
                    fontSize: '14px',
                    '& .RaMenuItemLink-icon': {
                        color: 'var(--gray)',
                    },
                    '&:hover': {
                        backgroundColor: 'transparent',
                        borderBottom: '2px solid var(--blue)',
                        color: 'var(--blue)',
                        '& .RaMenuItemLink-icon': {
                            color: 'var(--blue)',
                        },
                    },
                    '&.RaMenuItemLink-active': {
                        borderBottom: '2px solid var(--blue)',
                        color: 'var(--blue)',
                        '& .RaMenuItemLink-icon': {
                            color: 'var(--blue)',
                        },
                    },
                },
            },
        },
        RaList: {
            styleOverrides: {
                root: {
                    '& .RaList-content': {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }
                },
            },
        },
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: ['Montserrat', 'Arial', 'sans-serif'].join(','),
    },
};

export default lightTheme;