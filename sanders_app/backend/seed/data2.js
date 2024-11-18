const data = [
    {
        name: 'Admin 1',
        surname: 'Sanders',
        email: 'admin@sanders.com.mx',
        password: 'Password123',
        role: 'admin',
        projects: [
            {
                name: 'Agua para Todos',
                description: 'Proyecto enfocado en la construcción de pozos y sistemas de filtración en comunidades rurales sin acceso a agua potable de calidad y en cantidad suficiente para sus necesidades básicas de higiene y consumo humano diario en México y Latinoamérica en general con el fin de mejorar la calidad de vida de sus habitantes. Para ello, se busca recaudar fondos para la construcción de pozos y sistemas de filtración de agua en comunidades rurales sin acceso a agua potable de calidad y en cantidad suficiente para sus necesidades básicas de higiene y consumo humano diario.',
                image: 'testing/water.webp',
                money_goal: 50000,
                money_raised: 0,
                type: 'water',
                impact: 2000,
                createdAt: '2023-12-13T05:24:11.584+00:00',
                milestones: [
                    {
                        reached: true,
                        description: 'Iniciar excavaciones',
                        percentage: 10
                    },
                    {
                        reached: true,
                        description: 'Instalación del sistema de filtración',
                        percentage: 50
                    },
                    {
                        description: 'Finalización del proyecto',
                        percentage: 100
                    }
                ]
            },
            {
                name: 'Alimentación para el Futuro',
                description: 'Iniciativa que busca mejorar la nutrición infantil en comunidades indígenas y rurales de México a través de la distribución de alimentos básicos y la implementación de programas educativos sobre nutrición y alimentación saludable para padres y cuidadores de niños y niñas en situación de vulnerabilidad en México. Para ello, se busca recaudar fondos para la distribución de alimentos básicos y la implementación de programas educativos sobre nutrición y alimentación saludable para padres y cuidadores de niños y niñas en situación de vulnerabilidad en México.',
                image: 'testing/nutrition.webp',
                money_goal: 75000,
                money_raised: 0,
                type: 'nutrition',
                impact: 5000,
                createdAt: '2023-12-13T05:24:11.584+00:00',
                milestones: [
                    {
                        reached: true,
                        description: 'Distribución de alimentos básicos',
                        percentage: 20
                    },
                    {
                        description: 'Implementación de programas educativos',
                        percentage: 60
                    },
                    {
                        description: 'Evaluación de impacto',
                        percentage: 100
                    }
                ]
            }
        ]
    },
    {
        name: 'Admin 2',
        surname: 'Sanders',
        email: 'admin2@sanders.com.mx',
        password: 'Password123',
        role: 'admin',
        projects: [
            {
                name: 'Salud Sexual Responsable',
                description: 'Proyecto enfocado en la educación y prevención de embarazos no planificados en adolescentes y jóvenes de comunidades rurales y urbanas de México a través de la capacitación de promotores comunitarios, la distribución de material educativo y el monitoreo de resultados en México. Para ello, se busca recaudar fondos para la capacitación de promotores comunitarios, la distribución de material educativo y el monitoreo de resultados en México.',
                money_goal: 40000,
                image: 'testing/sexuality.webp',
                money_raised: 0,
                type: 'sexuality',
                impact: 3000,
                createdAt: '2023-12-13T05:24:11.584+00:00',
                milestones: [
                    {
                        reached: true,
                        description: 'Capacitación de promotores comunitarios',
                        percentage: 25,
                    },
                    {
                        description: 'Distribución de material educativo',
                        percentage: 60,
                    },
                    {
                        description: 'Monitoreo de resultados',
                        percentage: 100,
                    }
                ]
            }
        ]
    },
    {
        name: 'Lewis',
        surname: 'Hamilton',
        email: 'lewis@donors.org',
        password: 'Password123',
        createdAt: '2024-02-13T05:24:11.584+00:00',
        role: 'donor',
        confirmed: true,
        donations: [
            {
                amount: 500,
                method: 'paypal',
                createdAt: '2024-07-13T05:24:11.584+00:00',
            },
            {
                amount: 1000,
                method: 'stripe',
                createdAt: '2024-07-13T05:24:11.584+00:00',
            }
        ]
    },
    {
        name: 'Elon',
        surname: 'Musk',
        email: 'elon@donors.org',
        password: 'Password123',
        createdAt: '2024-07-13T05:24:11.584+00:00',
        role: 'donor',
        confirmed: true,
        donations: [
            {
                amount: 300,
                method: 'paypal',
                createdAt: '2024-08-13T05:24:11.584+00:00',
            },
            {
                amount: 700,
                method: 'stripe',
                createdAt: '2024-10-13T05:24:11.584+00:00',
            }
        ]
    },
    {
        name: 'Camilo',
        surname: 'Vargas',
        email: 'camilo@donors.org',
        password: 'Password123',
        createdAt: '2023-12-13T05:24:11.584+00:00',
        role: 'donor',
        confirmed: true,
        donations: [
            {
                amount: 150,
                method: 'paypal',
                createdAt: '2024-09-13T05:24:11.584+00:00',
            },
            {
                amount: 250,
                method: 'stripe',
                createdAt: '2024-10-13T05:24:11.584+00:00',
            }
        ]
    },
    {
        name: 'Indiana',
        surname: 'Jones',
        email: 'indiana@donors.org',
        password: 'Password123',
        createdAt: '2023-11-13T05:24:11.584+00:00',
        role: 'donor',
        confirmed: true,
        donations: []
    }
];

export default data;