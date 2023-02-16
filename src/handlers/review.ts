import prisma from '../db';

//get all reviews from a single user
export const getReviews = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            reviews: true
        }
    })

    res.json({ data: user.reviews})
}

//get single review from single user
export const getOneReview = async (req, res) => {
    const id = req.params.id

    const review = await prisma.review.findFirst({
        where: {
            id,
            reviewedById: req.user.id
        }
    })

    res.json({ data: review})
}

//get all reviews from all users who assigned "public" field to true
export const getPublicReviews = async (req, res) => {
    const publicReviews = await prisma.review.findMany({
        where: {
            public: true,
        }
    })

    res.json({data: publicReviews})
}

export const createReview = async (req, res) => {
    const review = await prisma.review.create({
        data: {
            establishment: req.body.establishment,
            address: req.body.address,
            description: req.body.description,
            body: req.body.body,
            rating: req.body.rating,
            public: req.body.public,
            reviewedById: req.user.id
        }
    })

    res.json({ data: review })
}

export const updateReview = async (req, res) => {
    const updatedReview = await prisma.review.update({
        where: {
            id_reviewedById: {
                id: req.params.id,
                reviewedById: req.user.id
            }
        },
        data: {
            establishment: req.body.establishment,
            address: req.body.address,
            description: req.body.description,
            body: req.body.body,
            rating: req.body.rating,
            public: req.body.public,
        }
    })

    res.json({ data: updatedReview })
}

export const deleteReview = async (req, res) => {
    const deletedReview = await prisma.review.delete({
        where: {
            id_reviewedById: {
                id: req.params.id,
                reviewedById: req.user.id
            }
        }
    })
    
    res.json({data: deletedReview})
}