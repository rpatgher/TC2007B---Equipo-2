import bcrypt from 'bcrypt';

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
                method: 'PayPal',
            },
            {
                amount: 2000,
                method: 'Stripe',
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
                method: 'PayPal',
            },
            {
                amount: 1500,
                method: 'Stripe',
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
                method: 'PayPal',
            },
            {
                amount: 300,
                method: 'Stripe',
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
                method: 'PayPal',
            },
            {
                amount: 200,
                method: 'Stripe',
            },
            {
                amount: 300,
                method: 'PayPal',
            },
            {
                amount: 400,
                method: 'Stripe',
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
                method: 'PayPal',
            },
            {
                amount: 200,
                method: 'Stripe',
            },
            {
                amount: 300,
                method: 'PayPal',
            },
            {
                amount: 400,
                method: 'Stripe',
            },
            {
                amount: 500,
                method: 'PayPal',
            },
            {
                amount: 600,
                method: 'Stripe',
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
                method: 'PayPal',
            },
            {
                amount: 200,
                method: 'Stripe',
            },
            {
                amount: 300,
                method: 'PayPal',
            },
            {
                amount: 400,
                method: 'Stripe',
            },
            {
                amount: 500,
                method: 'PayPal',
            },
            {
                amount: 600,
                method: 'Stripe',
            },
            {
                amount: 700,
                method: 'PayPal',
            },
            {
                amount: 800,
                method: 'Stripe',
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
                method: 'PayPal',
            },
            {
                amount: 200,
                method: 'Stripe',
            },
            {
                amount: 300,
                method: 'PayPal',
            },
            {
                amount: 400,
                method: 'Stripe',
            },
            {
                amount: 500,
                method: 'PayPal',
            },
            {
                amount: 600,
                method: 'Stripe',
            },
            {
                amount: 700,
                method: 'PayPal',
            },
            {
                amount: 800,
                method: 'Stripe',
            },
            {
                amount: 900,
                method: 'PayPal',
            },
            {
                amount: 1000,
                method: 'Stripe',
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
                method: 'PayPal',
            },
            {
                amount: 200,
                method: 'Stripe',
            },
            {
                amount: 300,
                method: 'PayPal',
            },
            {
                amount: 400,
                method: 'Stripe',
            },
            {
                amount: 500,
                method: 'PayPal',
            },
            {
                amount: 600,
                method: 'Stripe',
            },
            {
                amount: 700,
                method: 'PayPal',
            },
            {
                amount: 800,
                method: 'Stripe',
            },
            {
                amount: 900,
                method: 'PayPal',
            },
            {
                amount: 1000,
                method: 'Stripe',
            },
            {
                amount: 1100,
                method: 'PayPal',
            },
            {
                amount: 1200,
                method: 'Stripe',
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
                method: 'PayPal',
            },
            {
                amount: 200,
                method: 'Stripe',
            },
            {
                amount: 300,
                method: 'PayPal',
            },
            {
                amount: 400,
                method: 'Stripe',
            },
            {
                amount: 500,
                method: 'PayPal',
            },
            {
                amount: 600,
                method: 'Stripe',
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
                method: 'PayPal',
            },
            {
                amount: 200,
                method: 'Stripe',
            },
            {
                amount: 300,
                method: 'PayPal',
            },
            {
                amount: 400,
                method: 'Stripe',
            },
            {
                amount: 500,
                method: 'PayPal',
            },
            {
                amount: 600,
                method: 'Stripe',
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
                method: 'PayPal',
            },
            {
                amount: 200,
                method: 'Stripe',
            },
            {
                amount: 300,
                method: 'PayPal',
            },
            {
                amount: 400,
                method: 'Stripe',
            },
            {
                amount: 500,
                method: 'PayPal',
            },
            {
                amount: 600,
                method: 'Stripe',
            }
        ],
    },
];

export default users;