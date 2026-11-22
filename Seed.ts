import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  console.log('Starting database seeding...');

  // Create Genres
  const genres = await Promise.all([

    prisma.genre.upsert({
      where: { name: 'Technology' },
      update: {},
      create: {
        name: 'Technology',
        description: 'Books about computing and technology.'
      }
    }),

    prisma.genre.upsert({
      where: { name: 'Science' },
      update: {},
      create: {
        name: 'Science',
        description: 'Scientific discoveries and research.'
      }
    }),

    prisma.genre.upsert({
      where: { name: 'Fiction' },
      update: {},
      create: {
        name: 'Fiction',
        description: 'Fictional stories and novels.'
      }
    }),

    prisma.genre.upsert({
      where: { name: 'Business' },
      update: {},
      create: {
        name: 'Business',
        description: 'Business and entrepreneurship books.'
      }
    }),

    prisma.genre.upsert({
      where: { name: 'Education' },
      update: {},
      create: {
        name: 'Education',
        description: 'Educational and academic books.'
      }
    })

  ]);

  // Create Books
  const books = [

    // Technology
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      genreId: genres[0].id,
      totalCopies: 5
    },
    {
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '9780262046305',
      genreId: genres[0].id,
      totalCopies: 4
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'David Thomas',
      isbn: '9780135957059',
      genreId: genres[0].id,
      totalCopies: 3
    },
    {
      title: 'Artificial Intelligence',
      author: 'Stuart Russell',
      isbn: '9780134610993',
      genreId: genres[0].id,
      totalCopies: 4
    },

    // Science
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '9780553380163',
      genreId: genres[1].id,
      totalCopies: 3
    },
    {
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      isbn: '9780198788607',
      genreId: genres[1].id,
      totalCopies: 2
    },
    {
      title: 'Cosmos',
      author: 'Carl Sagan',
      isbn: '9780345539434',
      genreId: genres[1].id,
      totalCopies: 3
    },
    {
      title: 'The Origin of Species',
      author: 'Charles Darwin',
      isbn: '9780451529060',
      genreId: genres[1].id,
      totalCopies: 2
    },

    // Fiction
    {
      title: 'Things Fall Apart',
      author: 'Chinua Achebe',
      isbn: '9780385474542',
      genreId: genres[2].id,
      totalCopies: 5
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      genreId: genres[2].id,
      totalCopies: 3
    },
    {
      title: '1984',
      author: 'George Orwell',
      isbn: '9780451524935',
      genreId: genres[2].id,
      totalCopies: 4
    },
    {
      title: 'Animal Farm',
      author: 'George Orwell',
      isbn: '9780451526342',
      genreId: genres[2].id,
      totalCopies: 3
    },

    // Business
    {
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      isbn: '9781612681139',
      genreId: genres[3].id,
      totalCopies: 4
    },
    {
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      isbn: '9781585424337',
      genreId: genres[3].id,
      totalCopies: 3
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      isbn: '9780307887894',
      genreId: genres[3].id,
      totalCopies: 2
    },
    {
      title: 'Good to Great',
      author: 'Jim Collins',
      isbn: '9780066620992',
      genreId: genres[3].id,
      totalCopies: 3
    },

    // Education
    {
      title: 'How Learning Works',
      author: 'Susan Ambrose',
      isbn: '9780470484104',
      genreId: genres[4].id,
      totalCopies: 3
    },
    {
      title: 'Educational Psychology',
      author: 'Anita Woolfolk',
      isbn: '9780134774329',
      genreId: genres[4].id,
      totalCopies: 4
    },
    {
      title: 'Pedagogy of the Oppressed',
      author: 'Paulo Freire',
      isbn: '9780826412768',
      genreId: genres[4].id,
      totalCopies: 3
    },
    {
      title: 'Theories of Learning',
      author: 'Dale H. Schunk',
      isbn: '9780134893754',
      genreId: genres[4].id,
      totalCopies: 2
    }

  ];

  // Insert books
  for (const book of books) {

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: book
    });

  }

  console.log('Successfully seeded 5 genres and 20 books.');

}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });