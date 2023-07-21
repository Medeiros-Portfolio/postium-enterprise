import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //

    const data = {
      users: [
        {
          name: 'Rafael Medeiros',
          email: 'rafaelmedrib@gmail.com',
          password: 'admin',
          roles: ['admin'],
        },
        {
          name: 'Edson Arantes',
          email: 'edson.arantes@dontfollow.me',
          password: 'reader',
          roles: ['reader'],
        },
        {
          name: 'J. R. R. Tolkien',
          email: 'tolkienfromtheshrine@fakemail.com',
          password: 'writer',
          roles: ['writer'],
        },
      ],
      posts: [
        {
          title: 'Realities of futility',
          body: `“Sexual identity is part of the genre of language,” says Sontag.
          Postcultural textual theory states that the raison d’etre of the writer is
          deconstruction.

          It could be said that the subject is contextualised into a Foucaultist power
          relations that includes truth as a reality. Derrida suggests the use of
          precapitalist dedeconstructivism to attack outdated perceptions of reality.

          In a sense, several narratives concerning the constructive paradigm of
          narrative exist. Brophy[1] holds that the works of Gaiman
          are not postmodern.

          Thus, the characteristic theme of d’Erlette’s[2] critique
          of postcapitalist appropriation is a mythopoetical totality. If the
          constructive paradigm of narrative holds, we have to choose between
          subdialectic socialism and dialectic nationalism.`,
          public: true,
        },
        {
          title: 'Eco and Foucaultist power relations',
          body: `In the works of Eco, a predominant concept is the distinction between figure
          and ground. However, Sartre’s analysis of the constructive paradigm of
          narrative suggests that the Constitution is capable of intent, given that the
          premise of presemiotic discourse is valid. In The Aesthetics of Thomas
          Aquinas, Eco deconstructs Foucaultist power relations; in The Limits of
          Interpretation (Advances in Semiotics), although, he affirms Foucaultist
          power relations.

          “Society is fundamentally used in the service of class divisions,” says
          Debord; however, according to Buxton[3] , it is not so much
          society that is fundamentally used in the service of class divisions, but
          rather the fatal flaw, and some would say the collapse, of society. Thus,
          Sartre promotes the use of subdialectic socialism to read class. Baudrillard
          uses the term ‘Foucaultist power relations’ to denote the difference between
          sexual identity and language.

          However, the subject is interpolated into a constructive paradigm of
          narrative that includes narrativity as a reality. Derrida’s model of
          Foucaultist power relations holds that sexual identity has objective value.

          Therefore, the subject is contextualised into a constructive paradigm of
          narrative that includes culture as a totality. The primary theme of the works
          of Eco is a neocultural whole.`,
        },
      ],
      comments: [
        {
          message: "I'm not sure I understand this post",
        },
        {
          message: 'I love this post!',
        },
        {
          message: 'This post is so cool!',
        },
      ],
    }

    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany

    const userTableIsEmpty = (await db.user.count()) === 0
    if (userTableIsEmpty) {
      for (const user of data.users) {
        const [hashedPassword, salt] = hashPassword(user.password)
        await db.user.create({
          data: {
            name: user.name,
            email: user.email,
            hashedPassword,
            salt,
            roles: [...user.roles],
          },
        })
      }
    } else {
      console.log('Users already exist, skipping seeding.')
    }

    const { id: userId } = await db.user.findUnique({
      where: { email: data.users[2].email },
    })

    const postTableIsEmpty = (await db.post.count()) === 0
    if (postTableIsEmpty) {
      for (const post of data.posts) {
        await db.post.create({
          data: { ...post, userId },
        })
      }
    } else {
      console.log('Posts already exist, skipping seeding.')
    }

    const commentTableIsEmpty = (await db.comment.count()) === 0
    if (commentTableIsEmpty) {
      for (const comment of data.comments) {
        await db.comment.create({
          data: {
            ...comment,
            postId: 1,
            name: data.users[0].name,
          },
        })
      }
    } else {
      console.log('Comments already exist, skipping seeding.')
    }

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/auth-dbauth-api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //
    //   for (user of users) {
    //     const [hashedPassword, salt] = hashPassword(user.password)
    //     await db.user.create({
    //       data: {
    //         name: user.name,
    //         email: user.email,
    //         hashedPassword,
    //         salt
    //       }
    //     })
    //   }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
