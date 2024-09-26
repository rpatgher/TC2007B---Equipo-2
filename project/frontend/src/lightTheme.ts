
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
    },
};

export default lightTheme;