import bcrypt from 'bcrypt';

const users = [
    {
        name: 'Admin User',
        surname: 'Sanders',
        email: 'admin@sanders.com',
        password: 'Password123',
        role: 'admin'
    },
    {
        name: 'Admin User 2',
        surname: 'Sanders',
        email: 'admin2@sanders.com',
        password: 'Password123',
        role: 'admin'
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
    }
];
// const users = [
//     {
//         name: 'Admin User',
//         surname: 'Sanders',
//         email: 'admin@sanders.com',
//         password: bcrypt.hashSync('Password123', 10),
//         role: 'admin'
//     },
//     {
//         name: 'Admin User 2',
//         surname: 'Sanders',
//         email: 'admin2@sanders.com',
//         password: bcrypt.hashSync('Password123', 10),
//         role: 'admin'
//     },
//     {
//         name: 'John',
//         surname: 'Doe',
//         email: 'john@gmail.com',
//         password: bcrypt.hashSync('Password123', 10),
//     },
//     {
//         name: 'Jane',
//         surname: 'Doe',
//         email: 'jane@gmail.com',
//         password: bcrypt.hashSync('Password123', 10)
//     }
// ];

export default users;