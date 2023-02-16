import prisma from '../db';

export const getOneComment = async (req, res) => {
    const comment = prisma.comment.findUnique({
        where: {
            id: req.params.id
        }
    })
    res.json({ data: comment });
}


export const getComments = async (req, res) => {
    const reviews = await prisma.review.findMany({
        where: {
            public: true
        },
        include: {
            comments: true
        }
    })
    
    const comments = reviews.reduce((allComments, review) => {
        return [...allComments, ...review.comments]
    }, [])

    res.json({ data: comments})
}

export const createComment = async (req, res) => {
    const comment = await prisma.comment.create({
        data: {
            body: req.body.body,
            commentedById: req.user.id,
            commentedOnReviewId: req.review.id,
        }
    })
}

//set up right now so that only authors of comment can update their own comments
export const updateComment = async (req, res) => {
    const updatedComment = await prisma.comment.update({
        where: {
            id_commentedById: {
                id: req.params.id,
                commentedById: req.user.id
            },
            // id_commentedOnReviewId: {
            //     id: req.params.id,
            //     commentedOnReviewId: req.review.id
            // }
        },
        data: {
            body: req.body.body
        }
    })
    res.json({ data: updatedComment })
}

//set up right now so that only authors of the review that was commented on can delete other users' comments
export const deleteComment = async (req, res) => {
    const deletedComment = prisma.comment.delete({
        where: {
            id_commentedOnReviewId: {
                id: req.params.id,
                commentedOnReviewId: req.review.id
            },
            // id_commentedById: {
            //     id: req.params.id,
            //     commentedById: req.user.id
            // }
        }
    })

    res.json({ data: deletedComment })
 }