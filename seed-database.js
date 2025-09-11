const { PrismaClient } = require('./generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Sample library items data
const libraryItems = [
    // Books
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        year: 1925,
        genre: "Fiction",
        item_type: "book",
        publisher: "Scribner",
        language: "English",
        pages: 180,
        subject: "American Literature",
        keywords: "classic, jazz age, wealth, love",
        description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
        location: "Fiction Section A-1",
        quantity: 3
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "9780061120084",
        year: 1960,
        genre: "Fiction",
        item_type: "book",
        publisher: "J.B. Lippincott & Co.",
        language: "English",
        pages: 281,
        subject: "American Literature",
        keywords: "racism, justice, childhood, Alabama",
        description: "A powerful story of racial injustice and childhood innocence in the American South.",
        location: "Fiction Section A-2",
        quantity: 2
    },
    {
        title: "1984",
        author: "George Orwell",
        isbn: "9780451524935",
        year: 1949,
        genre: "Dystopian Fiction",
        item_type: "book",
        publisher: "Secker & Warburg",
        language: "English",
        pages: 328,
        subject: "Political Fiction",
        keywords: "totalitarianism, surveillance, dystopia",
        description: "A dystopian social science fiction novel about totalitarian control and surveillance.",
        location: "Fiction Section B-1",
        quantity: 4
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        isbn: "9780141439518",
        year: 1813,
        genre: "Romance",
        item_type: "book",
        publisher: "T. Egerton",
        language: "English",
        pages: 432,
        subject: "British Literature",
        keywords: "romance, marriage, social class, England",
        description: "A romantic novel about Elizabeth Bennet and Mr. Darcy in Georgian England.",
        location: "Fiction Section C-1",
        quantity: 2
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        isbn: "9780316769174",
        year: 1951,
        genre: "Coming-of-age",
        item_type: "book",
        publisher: "Little, Brown and Company",
        language: "English",
        pages: 277,
        subject: "American Literature",
        keywords: "teenage, rebellion, alienation, New York",
        description: "A coming-of-age story about teenage rebellion and alienation.",
        location: "Fiction Section A-3",
        quantity: 3
    },
    // Journals
    {
        title: "Nature",
        author: "Various Authors",
        isbn: "0028-0836",
        year: 2024,
        genre: "Science",
        item_type: "journal",
        publisher: "Nature Publishing Group",
        language: "English",
        pages: 120,
        subject: "Natural Sciences",
        keywords: "science, research, biology, physics, chemistry",
        description: "Weekly international journal publishing peer-reviewed research in all fields of science and technology.",
        location: "Journal Section J-1",
        quantity: 1
    },
    {
        title: "Science",
        author: "Various Authors",
        isbn: "0036-8075",
        year: 2024,
        genre: "Science",
        item_type: "journal",
        publisher: "American Association for the Advancement of Science",
        language: "English",
        pages: 80,
        subject: "Scientific Research",
        keywords: "research, discovery, innovation, technology",
        description: "Weekly peer-reviewed general science journal.",
        location: "Journal Section J-2",
        quantity: 1
    },
    // Multimedia
    {
        title: "Planet Earth II",
        author: "BBC Natural History Unit",
        isbn: "B01M0ZQX8N",
        year: 2016,
        genre: "Documentary",
        item_type: "multimedia",
        publisher: "BBC",
        language: "English",
        duration: 360,
        format: "Blu-ray",
        subject: "Nature Documentary",
        keywords: "nature, wildlife, planet, environment",
        description: "Award-winning nature documentary series showcasing the planet's most spectacular natural events.",
        location: "Multimedia Section M-1",
        quantity: 2
    },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        author: "Peter Jackson",
        isbn: "B00005JLYT",
        year: 2001,
        genre: "Fantasy",
        item_type: "multimedia",
        publisher: "New Line Cinema",
        language: "English",
        duration: 178,
        format: "DVD",
        subject: "Fantasy Film",
        keywords: "fantasy, adventure, magic, Middle-earth",
        description: "Epic fantasy film adaptation of J.R.R. Tolkien's novel.",
        location: "Multimedia Section M-2",
        quantity: 3
    },
    // Newspapers
    {
        title: "The New York Times",
        author: "Various Journalists",
        isbn: "0362-4331",
        year: 2024,
        genre: "News",
        item_type: "newspaper",
        publisher: "The New York Times Company",
        language: "English",
        pages: 40,
        subject: "General News",
        keywords: "news, politics, world events, journalism",
        description: "Daily American newspaper based in New York City.",
        location: "Newspaper Section N-1",
        quantity: 1
    },
    // Magazines
    {
        title: "National Geographic",
        author: "Various Authors",
        isbn: "0027-9358",
        year: 2024,
        genre: "Science & Nature",
        item_type: "magazine",
        publisher: "National Geographic Society",
        language: "English",
        pages: 120,
        subject: "Geography & Science",
        keywords: "geography, nature, culture, photography",
        description: "Monthly magazine featuring articles about geography, history, and world culture.",
        location: "Magazine Section MG-1",
        quantity: 1
    },
    // Thesis
    {
        title: "Machine Learning Applications in Healthcare",
        author: "Dr. Sarah Johnson",
        isbn: null,
        year: 2023,
        genre: "Academic",
        item_type: "thesis",
        publisher: "University of Technology",
        language: "English",
        pages: 150,
        subject: "Computer Science",
        keywords: "machine learning, healthcare, AI, medical technology",
        description: "Doctoral thesis exploring the applications of machine learning in healthcare systems.",
        location: "Thesis Section T-1",
        quantity: 1
    },
    // Reports
    {
        title: "Climate Change Impact Assessment 2024",
        author: "Environmental Research Institute",
        isbn: null,
        year: 2024,
        genre: "Research",
        item_type: "report",
        publisher: "ERI Publications",
        language: "English",
        pages: 200,
        subject: "Environmental Science",
        keywords: "climate change, environment, research, sustainability",
        description: "Comprehensive report on the current state of climate change and its global impacts.",
        location: "Report Section R-1",
        quantity: 1
    }
];

async function createUsers() {
    console.log('Creating users...');
    
    const users = [
        // Librarians
        {
            name: "Emma Johnson",
            email: "emma.johnson@example.com",
            password: "Emma@123",
            role: "librarian",
            gender: "female",
            phone_number: "+1-555-0101",
            address: "123 Library Lane, Book City, BC 12345"
        },
        {
            name: "Liam Smith",
            email: "liam.smith@example.com",
            password: "Liam@123",
            role: "librarian",
            gender: "male",
            phone_number: "+1-555-0102",
            address: "456 Knowledge Street, Reading Town, RT 67890"
        },
        {
            name: "Olivia Brown",
            email: "olivia.brown@example.com",
            password: "Olivia@123",
            role: "librarian",
            gender: "female",
            phone_number: "+1-555-0103",
            address: "789 Wisdom Avenue, Study City, SC 54321"
        },
        {
            name: "Noah Davis",
            email: "noah.davis@example.com",
            password: "Noah@123",
            role: "librarian",
            gender: "male",
            phone_number: "+1-555-0104",
            address: "321 Learning Boulevard, Education Town, ET 98765"
        },
        {
            name: "Ava Wilson",
            email: "ava.wilson@example.com",
            password: "Ava@123",
            role: "librarian",
            gender: "female",
            phone_number: "+1-555-0105",
            address: "654 Research Road, Academic City, AC 13579"
        },
        // Patrons
        {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "John@123",
            role: "patron",
            gender: "male",
            phone_number: "+1-555-0201",
            address: "100 Student Street, College Town, CT 11111"
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            password: "Jane@123",
            role: "patron",
            gender: "female",
            phone_number: "+1-555-0202",
            address: "200 Scholar Lane, University City, UC 22222"
        },
        {
            name: "Mark Lee",
            email: "mark.lee@example.com",
            password: "Mark@123",
            role: "patron",
            gender: "male",
            phone_number: "+1-555-0203",
            address: "300 Reader Road, Learning Town, LT 33333"
        },
        // Admin
        {
            name: "Admin",
            email: "admin123@gmail.com",
            password: "Admin@123",
            role: "admin",
            gender: "other",
            phone_number: "+1-555-0001",
            address: "500 Admin Plaza, System City, SC 00000"
        }
    ];

    for (const userData of users) {
        try {
            // Check if user already exists
            const existingUser = await prisma.users.findUnique({
                where: { email: userData.email }
            });

            if (existingUser) {
                console.log(`User ${userData.email} already exists, skipping...`);
                continue;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(userData.password, 12);

            // Create user
            const user = await prisma.users.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    password_hash: hashedPassword,
                    role: userData.role,
                    gender: userData.gender,
                    phone_number: userData.phone_number,
                    address: userData.address,
                    status: 'active'
                }
            });

            console.log(`✅ Created ${userData.role}: ${userData.name} (${userData.email})`);

        } catch (error) {
            console.error(`❌ Error creating user ${userData.email}:`, error.message);
        }
    }
}

async function createLibraryItems() {
    console.log('\nCreating library items...');
    
    // Get a librarian to assign as the creator
    const librarian = await prisma.users.findFirst({
        where: { role: 'librarian' }
    });

    if (!librarian) {
        console.error('No librarian found. Please create users first.');
        return;
    }

    for (const itemData of libraryItems) {
        try {
            // Check if item already exists
            const existingItem = await prisma.library_items.findFirst({
                where: {
                    title: itemData.title,
                    author: itemData.author,
                    item_type: itemData.item_type
                }
            });

            if (existingItem) {
                console.log(`Item "${itemData.title}" already exists, skipping...`);
                continue;
            }

            // Create library item
            const item = await prisma.library_items.create({
                data: {
                    title: itemData.title,
                    author: itemData.author,
                    isbn: itemData.isbn,
                    year: itemData.year,
                    genre: itemData.genre,
                    item_type: itemData.item_type,
                    publisher: itemData.publisher,
                    language: itemData.language,
                    pages: itemData.pages,
                    duration: itemData.duration,
                    format: itemData.format,
                    subject: itemData.subject,
                    keywords: itemData.keywords,
                    description: itemData.description,
                    location: itemData.location,
                    librarian_id: librarian.user_id,
                    record_status: 'active'
                }
            });

            // Create copies
            const copies = Array.from({ length: itemData.quantity }, () => ({
                item_id: item.item_id,
                status: 'available',
                user_id: null,
                record_status: 'active'
            }));

            await prisma.item_tran.createMany({
                data: copies
            });

            console.log(`✅ Created ${itemData.item_type}: "${itemData.title}" with ${itemData.quantity} copies`);

        } catch (error) {
            console.error(`❌ Error creating item "${itemData.title}":`, error.message);
        }
    }
}

async function createSystemConfig() {
    console.log('\nCreating system configuration...');
    
    const configs = [
        {
            config_key: 'max_borrow_days',
            config_value: '14',
            description: 'Maximum number of days items can be borrowed'
        },
        {
            config_key: 'fine_per_day',
            config_value: '1.00',
            description: 'Fine amount per day for overdue items'
        },
        {
            config_key: 'reservation_expiry_days',
            config_value: '7',
            description: 'Number of days reservations remain active'
        },
        {
            config_key: 'max_reservations_per_user',
            config_value: '5',
            description: 'Maximum number of active reservations per user'
        },
        {
            config_key: 'library_name',
            config_value: 'Digital Library Management System',
            description: 'Name of the library'
        },
        {
            config_key: 'library_address',
            config_value: '123 Knowledge Street, Learning City, LC 12345',
            description: 'Library address'
        },
        {
            config_key: 'library_phone',
            config_value: '+1-555-LIBRARY',
            description: 'Library contact phone number'
        },
        {
            config_key: 'library_email',
            config_value: 'info@library.com',
            description: 'Library contact email'
        }
    ];

    for (const config of configs) {
        try {
            await prisma.system_config.upsert({
                where: { config_key: config.config_key },
                update: {
                    config_value: config.config_value,
                    description: config.description
                },
                create: config
            });

            console.log(`✅ Created/Updated config: ${config.config_key}`);

        } catch (error) {
            console.error(`❌ Error creating config ${config.config_key}:`, error.message);
        }
    }
}

async function main() {
    try {
        console.log('🌱 Starting database seeding...\n');
        
        await createUsers();
        await createLibraryItems();
        await createSystemConfig();
        
        console.log('\n🎉 Database seeding completed successfully!');
        console.log('\n📋 Summary:');
        console.log('- 5 Librarians created');
        console.log('- 3 Patrons created');
        console.log('- 1 Admin created');
        console.log('- 13 Library items created with multiple copies');
        console.log('- 8 System configurations created');
        
        console.log('\n🔑 Login Credentials:');
        console.log('Admin: admin123@gmail.com / Admin@123');
        console.log('Librarian: emma.johnson@example.com / Emma@123');
        console.log('Patron: john.doe@example.com / John@123');
        
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
