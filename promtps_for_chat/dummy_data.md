Hola chat. Estoy haciendo un CRM para un fundación llamada Sanders, ellos son una Asociación Civil sin fines de lucro creada en el año 2016 por iniciativa del empresario mexicano Guillermo Sanders Acedo (1935-2019), para contribuir a la mejora de la calidad de vida en grupos sociales en situación de vulnerabilidad, mediante la promoción de la salud sexual y reproductiva, la nutrición comunitaria y el abastecimiento de agua.
Su objeto social es desarrollar proyectos para contribuir a enfrentar los rezagos sociales en materia de salud sexual y reproductiva, nutrición comunitaria y abasto de agua.
Su misión, fomentar la salud sexual y reproductiva, la sana alimentación y el abasto de agua potable entre grupos más vulnerables de la sociedad, para prevenir y incidencia y prevalencia de embarazos no planificados, infecciones de transmisión sexual, así como padecimientos asociados a ala malnutrición y al consumo de agua contaminada.
Y su visión es ser un referente por su modelo de intervención preventiva para fomentar la salud sexual y reproductiva, la sana alimentación y el abasto de agua potable en grupos sociales en situación de vulnerabilidad, contribuyendo de esa manera a la construcción de condiciones de justicia social en México.

El CRM que estoy desarrollando, el frontend lo tengo en React con TypeScript y el backend en Node.js con Express y MongoDB para la base de datos. Tiene 3 principales modelos: Proyectos, Usuarios (que pueden ser administradores, donadores y donadores físicos) y Donaciones. Cada modelos está definido de la siguiente manera:

Proyecto: 
````
Project: {
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type:String,
        required: true,
        trim: true
    },
    money_goal: {
        type: Number,
        required: true
    },
    money_raised: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        required: true,
        enum: ['water', 'sexuality', 'nutrition']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation'
    }],
    milestones: [{
        reached: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            required: true
        },
        percentage: {
            type: Number,
            required: true
        },
    }],
    impact: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
},
````
Donation: 
````
Donation: {
    amount: {
        type: Number,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
        default: null
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    method: {
        type: String,
        enum: ['paypal', 'stripe', 'physical'],
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}
````
Usuario
````
Admin: {
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false
    }],
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}

Donor: {
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
        required: false
    }],
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}

PhysicalDonor: {
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
        required: false
    }],
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}


````

Tengo un arreglo de javascript con el que inserto dummy data, pero es información muy básica que quiero que sustituyas con dummy data más realista. Mantén la misma estructura (para mantener las realaciones) pero solo sustituye los datos de manera que sea información más realista.

````
const data = [
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
                image: 'testing/project.png',
                money_goal: 10000,
                money_raised: 0,
                type: 'sexuality',
                impact: 500,
                milestones: [
                    {
                        reached: true,
                        description: 'Milestone 1',
                        percentage: 10
                    },
                    {
                        reached: true,
                        description: 'Milestone 2',
                        percentage: 70
                    },
                    {
                        description: 'Milestone 3',
                        percentage: 100
                    }
                ]
            },
            {
                name: 'Project 2',
                description: 'Description 2',
                image: 'testing/project.png',
                money_goal: 20000,
                money_raised: 0,
                type: 'water',
                impact: 1000,
                milestones: [
                    {
                        reached: true,
                        description: 'Milestone 1',
                        percentage: 10
                    },
                    {
                        description: 'Milestone 2',
                        percentage: 70
                    },
                    {
                        description: 'Milestone 3',
                        percentage: 100
                    }
                ]
            },
            {
                name: 'Project 3',
                description: 'Description 3',
                money_goal: 30000,
                image: 'testing/project.png',
                money_raised: 0,
                type: 'nutrition',
                impact: 1500,
                milestones: [
                    {
                        reached: true,
                        description: 'Milestone 1',
                        percentage: 10
                    },
                    {
                        reached: true,
                        description: 'Milestone 2',
                        percentage: 70
                    },
                    {
                        reached: true,
                        description: 'Milestone 3',
                        percentage: 100
                    }
                ]
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
                image: 'testing/project.png',
                money_raised: 0,
                type: 'nutrition',
                impact: 2000,
                milestones: [
                    {
                        reached: true,
                        description: 'Milestone 1',
                        percentage: 10
                    },
                    {
                        description: 'Milestone 2',
                        percentage: 70
                    },
                    {
                        description: 'Milestone 3',
                        percentage: 100
                    }
                ]
            },
            {
                name: 'Project 5',
                description: 'Description 5',
                money_goal: 50000,
                image: 'testing/project.png',
                money_raised: 0,
                type: 'water',
                impact: 2500,
                milestones: [
                    {
                        description: 'Milestone 1',
                        percentage: 10
                    },
                    {
                        description: 'Milestone 2',
                        percentage: 70
                    },
                    {
                        description: 'Milestone 3',
                        percentage: 100
                    }
                ]
            },
            {
                name: 'Project 6',
                description: 'Description 6',
                money_goal: 60000,
                image: 'testing/project.png',
                money_raised: 0,
                type: 'sexuality',
                impact: 3000,
                milestones: [
                    {
                        description: 'Milestone 1',
                        percentage: 10
                    },
                    {
                        description: 'Milestone 2',
                        percentage: 70
                    },
                    {
                        description: 'Milestone 3',
                        percentage: 100
                    }
                ]
            }
        ]
    },
    {
        name: 'John',
        surname: 'Doe',
        email: 'john@gmail.com',
        password: 'Password123',
        role: 'donor',
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
        role: 'donor',
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
        role: 'donor',
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
        role: 'donor',
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
        role: 'donor',
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
        role: 'donor',
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
        role: 'donor',
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
        role: 'donor',
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
        role: 'donor',
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
        role: 'donor',
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
        role: 'donor',
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
````