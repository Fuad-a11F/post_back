import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

const user = [
    {id:1 ,
    username: '123123',
    email: '123123',
    password: '123123',
    }
]


const post = [
    {
        id:1 ,
        text: '11',
        time: '111',
        title: '11',
        picture: '',        author: '123123',
        like: 0,
        comment: [],
        personsLiked: [1]
    },    {
        id:2 ,
        text: '22',
        time: '22',
        like: 22,
        title: '222',
        picture: '',        author: '123123',
        comment: [],
        personsLiked: []
    },    {
        id:3 ,
        text: '333',
        time: '333',
        title: '333',
        picture: '',        author: '123123',
        like: 3,
        comment: [],
        personsLiked: []
    },    {
        id:4 ,
        text: '444',
        time: '444',
        title: '444',
        picture: '',        author: '123123',
        like: 0,
        comment: [],
        personsLiked: []
    },    {
        id:5 ,
        text: '55',
        time: '555',
        like: 22,
        title: '555',
        picture: '',        author: '123123',
        comment: [],
        personsLiked: [1]
    },    {
        id:6 ,
        text: '66',
        time: '666',
        title: '666',
        picture: '',        author: '123123',
        like: 3,
        comment: [],
        personsLiked: [1]
    },   {
        id:7 ,
        text: '777',
        time: '777',
        like: 22,
        title: '777',
        picture: '',        author: '123123',
        comment: [],
        personsLiked: []
    },    {
        id:8 ,
        text: '888',
        time: '888',
        title: '88',
        picture: '',        author: '123123',
        like: 3,
        comment: [],
        personsLiked: []
    },
]





app.get('/get-me', (req, res) => {
    res.send(user.find(item => Number(item.id) === Number(req.headers.authorization))?.username)
})



app.get('/posts', (req, res) => {
    res.send(post)
})

app.get('/post/:id', (req, res) => {
    const result  = post.find(item => Number(item.id) === Number(req.params.id))
    res.send(result)
})

app.delete('/post/:id', (req, res) => {
    post.splice(post.findIndex(item => Number(item.id) === Number(req.params.id)), 1)
    res.send({ok: 'ok'})
})

app.put('/post/:id/like', (req, res) => {
    if (post.find(item => Number(item.id) === Number(req.params.id))) {
        post.find(item => Number(item.id) === Number(req.params.id)).like += 1
        post.find(item => Number(item.id) === Number(req.params.id)).personsLiked.push(+req.headers.authorization)
    }

    res.send({ok: 'ok'})
})





app.post('/post', (req, res) => {
    const result = req.body
    result.id = post.length + 1
    result.author = user.find(item => Number(item.id) === Number(req.headers.authorization))?.username
    result.comment = []
    result.like = 0
    result.personsLiked = []
    post.push(result)
    res.send(result)
})





app.post('/comment/:id', (req, res) => {
    const result = req.body
    result.author = user.find(item => Number(item.id) === Number(req.headers.authorization))?.username
    const post_temp =post.find(item => Number(item.id) === Number(req.params.id))
    if (post_temp.comment.length === 0) {
        result.id = 1
    } else {
        result.id = post_temp?.comment[post_temp.comment.length - 1].id + 1
    }


    post.find(item => Number(item.id) === Number(req.params.id))?.comment.push(result)
    res.send('Hello World!')
})

app.put('/comment/:id', (req, res) => {
    post.find(item => Number(item.id) === Number(req.body.postId)).comment.find(item => Number(item.id) === Number(req.params.id)).comment = req.body.comment

    res.send('Hello World!')
})

app.delete('/comment/:postId/:commentId', (req, res) => {
    const post_temp = post.find(item => Number(item.id) === Number(req.params.postId))
    post_temp.comment.splice(post_temp.comment.findIndex(item => Number(item.id) === Number(req.params.commentId)), 1)

    res.send('Hello World!')
})

app.get('/comment/:postId', (req, res) => {
    const result = post.find(item => Number(item.id) === Number(req.params.postId))?.comment
    res.send(result)
})



app.post('/login', (req, res) => {
    const userNew = req.body

    const id = user.find(item => item.username === userNew.username && item.password === userNew.password)?.id

    if (id) {
        res.send({id})
    } else {
        res.send({ message: 'Пользователь не найден' })
    }
})

app.post('/registration', (req, res) => {
    const userNew = req.body
    const checkUsers = user.filter(item => item.username === userNew.username || item.email === userNew.email)

    if (checkUsers.length > 0) {
        res.send({message: 'Пользователь с таким email или login уже есть в системе'})
        return
    }

    userNew.id = user.length + 1
    user.push(userNew)

    res.send({id: userNew.id})
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})