const contacts = [
    {
        _id: '604290563207180a6436ec46',
        name: 'qweqweqweqwe',
        email: 'qweqweqweqwe@gmail.com',
        phone: '22222',
        createdAt: '2021-03-05T20:11:02.010Z',
        updatedAt: '2021-03-05T20:11:02.010Z',
    },
    {
        _id: '604290563207180a6436ec42',
        name: 'qweqweqwe',
        email: 'qweqweqwe@gmail.com',
        phone: '22222',
        createdAt: '2021-03-05T20:11:02.010Z',
        updatedAt: '2021-03-05T20:11:02.010Z',
    },
    {
        _id: '604290563207180a6436ec41',
        name: 'qweqwe',
        email: 'qweqwe@gmail.com',
        phone: '22222',
        createdAt: '2021-03-05T20:11:02.010Z',
        updatedAt: '2021-03-05T20:11:02.010Z',
    },
    {
        _id: '604290563207180a6436ec42',
        name: 'qwe',
        email: 'qwe@gmail.com',
        phone: '22222',
        createdAt: '2021-03-05T20:11:02.010Z',
        updatedAt: '2021-03-05T20:11:02.010Z',
    },
]

const wrongId = '604290563197180a6436ec41'

const newContact = {
    name: 'asd',
    email: 'asd@gmail.com',
    phone: '123123123',
}

const User = {
    _id: '604b77d4a6291b237c796b90',
    name: 'Guest',
    subscription: 'free',
    token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDc4MGIwYTMzZjU5M2I1ODY2ZDcwZCIsImlhdCI6MTYxNTMzNDc0NCwiZXhwIjoxNjE1MzM4MzQ0fQ.ZOul5xw2qGjRiFVXE4eKyIcJJ3ubRsVcmlXSm-KzNzg',
    avatar:
        'https://res.cloudinary.com/volkor/image/upload/v1615705235/Photo/mwjnt55slqf7uo5xuevc.jpg',
    imgIdCloud: 'Photo/mwjnt55slqf7uo5xuevc',
    email: 'img@test.com',
    password: '$2a$08$70.UQLLAunkfzAczwr.M3OHSAewl9AtuwstKxscRK3B/NIdxFmM0m',
    createdAt: '2021-03-14T06:47:44.750Z',
    updatedAt: '2021-03-14T07:08:39.962Z',
}

const Users = [
    User,
    {
        _id: '604db1902523ea15f8158df8',
        name: 'Guest',
        subscription: 'free',
        token:
            'eyJhb2ciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGRiMTkwMjUyM2VhMTVmODE1OGRmOCIsImlhdCI6MTYxNTcwNTcxOSwiZXhwIjoxNjE1NzEyOTE5fQ.DjyHzYGT5aypO4z9JgSfbk3mgKB9RoDnBJ7sBAvJ9DQ',
        avatar:
            'https://res.cloudinary.com/volkor/image/upload/v1615705235/Photo/mwjnt55slqf7uo5xuevc.jpg',
        imgIdCloud: 'Photo/mwjnt55slqf7uo5xuevc',
        email: 'img1@test.com',
        password:
            '$2a$08$70.UQLLAunkfzAczwr.M3OHSAewl9AtuwstKxscRK3B/NIdxFmM0m',
        createdAt: '2021-03-14T06:47:44.750Z',
        updatedAt: '2021-03-14T07:08:39.962Z',
    },
    {
        _id: '604db1902523ea15f8158df9',
        name: 'Guest',
        subscription: 'free',
        token:
            'eyJhb3ciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGRiMTkwMjUyM2VhMTVmODE1OGRmOCIsImlhdCI6MTYxNTcwNTcxOSwiZXhwIjoxNjE1NzEyOTE5fQ.DjyHzYGT5aypO4z9JgSfbk3mgKB9RoDnBJ7sBAvJ9DQ',
        avatar:
            'https://res.cloudinary.com/volkor/image/upload/v1615705235/Photo/mwjnt55slqf7uo5xuevc.jpg',
        imgIdCloud: 'Photo/mwjnt55slqf7uo5xuevc',
        email: 'img2@test.com',
        password:
            '$2a$08$70.UQLLAunkfzAczwr.M3OHSAewl9AtuwstKxscRK3B/NIdxFmM0m',
        createdAt: '2021-03-14T06:47:44.750Z',
        updatedAt: '2021-03-14T07:08:39.962Z',
    },
    {
        _id: '604db1902523ea15f8158df0',
        name: 'Guest',
        subscription: 'free',
        token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGRiMTkwMjUyM2VhMTVmODE1OGRmOCIsImlhdCI6MTYxNTcwNTcxOSwiZXhwIjoxNjE1NzEyOTE5fQ.DjyHzYGT5aypO4z9JgSfbk3mgKB9RoDnBJ7sBAvJ9DQ',
        avatar:
            'https://res.cloudinary.com/volkor/image/upload/v1615705235/Photo/mwjnt55slqf7uo5xuevc.jpg',
        imgIdCloud: 'Photo/mwjnt55slqf7uo5xuevc',
        email: 'img3@test.com',
        password:
            '$2a$08$70.UQLLAunkfzAczwr.M3OHSAewl9AtuwstKxscRK3B/NIdxFmM0m',
        createdAt: '2021-03-14T06:47:44.750Z',
        updatedAt: '2021-03-14T07:08:39.962Z',
    },
]

const userTemplate = {
    _id: '604db1902523ea15f8158df3',
    name: 'Guest',
    subscription: 'free',
    token: null,
    avatar: null,
    imgIdCloud: null,
    email: 'email',
    password: '$2a$08$70.UQLLAunkfzAczwr.M3OHSAewl9AtuwstKxscRK3B/NIdxFmM0m',
    createdAt: '2021-03-14T06:47:44.750Z',
    updatedAt: '2021-03-14T07:08:39.962Z',
}

module.exports = {
    wrongId,
    contacts,
    Users,
    User,
    newContact,
    userTemplate,
}
