const users = [
    {
        name: 'Señora 1',
        surname: 'Sanders',
        email: 'admin@sanders.com',
        password: 'Password123',
        role: 'admin',
        projects: [
            {
                name: 'Project 1',
                description: 'Description 1',
                money_goal: 10000,
                money_raised: 1000,
                type: 'sexuality'
            },
            {
                name: 'Project 2',
                description: 'Description 2',
                money_goal: 20000,
                money_raised: 1530,
                type: 'water'
            },
            {
                name: 'Project 3',
                description: 'Description 3',
                money_goal: 30000,
                money_raised: 20000,
                type: 'nutrition'
            }
        ]
    },
    {
        name: 'Señora 2',
        surname: 'Sanders',
        email: 'admin2@sanders.com',
        password: 'Password123',
        role: 'admin',
        projects: [
            {
                name: 'Project 4',
                description: 'Description 4',
                money_goal: 40000,
                money_raised: 2500,
                type: 'nutrition'
            },
            {
                name: 'Project 5',
                description: 'Description 5',
                money_goal: 50000,
                money_raised: 4000,
                type: 'water'
            },
            {
                name: 'Project 6',
                description: 'Description 6',
                money_goal: 60000,
                money_raised: 30000,
                type: 'sexuality'
            }
        ]
    },
    {
        name: 'John',
        surname: 'Doe',
        email: 'john@gmail.com',
        password: 'Password123',
        donations: [
            {
                amount: 1000,
                method: 'paypal',
            },
            {
                amount: 2000,
                method: 'stripe',
            }
        ]
    },
    {
        name: 'Jane',
        surname: 'Doe',
        email: 'jane@gmail.com',
        password: 'Password123',
        donations: [
            {
                amount: 500,
                method: 'paypal',
            },
            {
                amount: 1500,
                method: 'stripe',
            }
        ]
    },
    {
        name: 'Sarah',
        surname: 'Smith',
        email: 'sarah@gmail.com',
        password: 'Password123',
        donations: [
            {
                amount: 200,
                method: 'paypal',
            },
            {
                amount: 300,
                method: 'stripe',
            }
        ]
    },
    {
        name: 'David',
        surname: 'Jones',
        email: 'david@gmail.com',
        password: 'Password123',
        donations: [
            {
                amount: 100,
                method: 'paypal',
            },
            {
                amount: 200,
                method: 'stripe',
            },
            {
                amount: 300,
                method: 'paypal',
            },
            {
                amount: 400,
                method: 'stripe',
            }
        ]
    },
    {
        name: 'Paul',
        surname: 'Williams',
        email: 'paul@gmail.com',
        password: 'Password123',
        donations: [
            {
                amount: 100,
                method: 'paypal',
            },
            {
                amount: 200,
                method: 'stripe',
            },
            {
                amount: 300,
                method: 'paypal',
            },
            {
                amount: 400,
                method: 'stripe',
            },
            {
                amount: 500,
                method: 'paypal',
            },
            {
                amount: 600,
                method: 'stripe',
            }
        ]
    },
    {
        name: 'Emma',
        surname: 'Wilson',
        email: 'emma@gmail.com',
        password: 'Password123',
        donations: [
            {
                amount: 100,
                method: 'paypal',
            },
            {
                amount: 200,
                method: 'stripe',
            },
            {
                amount: 300,
                method: 'paypal',
            },
            {
                amount: 400,
                method: 'stripe',
            },
            {
                amount: 500,
                method: 'paypal',
            },
            {
                amount: 600,
                method: 'stripe',
            },
            {
                amount: 700,
                method: 'paypal',
            },
            {
                amount: 800,
                method: 'stripe',
            }
        ]
    },
    {
        name: 'Olivia',
        surname: 'Brown',
        email: 'olivia@gmail.com',
        password: 'Password123',
        donations: [
            {
                amount: 100,
                method: 'paypal',
            },
            {
                amount: 200,
                method: 'stripe',
            },
            {
                amount: 300,
                method: 'paypal',
            },
            {
                amount: 400,
                method: 'stripe',
            },
            {
                amount: 500,
                method: 'paypal',
            },
            {
                amount: 600,
                method: 'stripe',
            },
            {
                amount: 700,
                method: 'paypal',
            },
            {
                amount: 800,
                method: 'stripe',
            },
            {
                amount: 900,
                method: 'paypal',
            },
            {
                amount: 1000,
                method: 'stripe',
            }
        ]
    },
    {
        name: 'Mia',
        surname: 'Taylor',
        email: 'mia@gmail.com',
        password: 'Password123',
        donations: [
            {
                amount: 100,
                method: 'paypal',
            },
            {
                amount: 200,
                method: 'stripe',
            },
            {
                amount: 300,
                method: 'paypal',
            },
            {
                amount: 400,
                method: 'stripe',
            },
            {
                amount: 500,
                method: 'paypal',
            },
            {
                amount: 600,
                method: 'stripe',
            },
            {
                amount: 700,
                method: 'paypal',
            },
            {
                amount: 800,
                method: 'stripe',
            },
            {
                amount: 900,
                method: 'paypal',
            },
            {
                amount: 1000,
                method: 'stripe',
            },
            {
                amount: 1100,
                method: 'paypal',
            },
            {
                amount: 1200,
                method: 'stripe',
            }
        ]
    },
    {
        name: 'Sophia',
        surname: 'Anderson',
        email: 'sophia@gmail.com',
        password: 'Password123',
        donations: [
            {
                amount: 100,
                method: 'paypal',
            },
            {
                amount: 200,
                method: 'stripe',
            },
            {
                amount: 300,
                method: 'paypal',
            },
            {
                amount: 400,
                method: 'stripe',
            },
            {
                amount: 500,
                method: 'paypal',
            },
            {
                amount: 600,
                method: 'stripe',
            }
        ],
    },
    {
        name: 'Isabella',
        surname: 'Thomas',
        email: 'isabella@gmail.com',
        password: 'Password123',
        donations: [
            {
                amount: 100,
                method: 'paypal',
            },
            {
                amount: 200,
                method: 'stripe',
            },
            {
                amount: 300,
                method: 'paypal',
            },
            {
                amount: 400,
                method: 'stripe',
            },
            {
                amount: 500,
                method: 'paypal',
            },
            {
                amount: 600,
                method: 'stripe',
            }
        ],
    },
    {
        name: 'Charlotte',
        surname: 'Jackson',
        email: 'charlotte@gmail.com',
        password: 'Password123',
        donations: [
            {
                amount: 100,
                method: 'paypal',
            },
            {
                amount: 200,
                method: 'stripe',
            },
            {
                amount: 300,
                method: 'paypal',
            },
            {
                amount: 400,
                method: 'stripe',
            },
            {
                amount: 500,
                method: 'paypal',
            },
            {
                amount: 600,
                method: 'stripe',
            }
        ],
    },
];

export default users;