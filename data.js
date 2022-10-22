const authors = [
    {
        id: "1",
        name: "Albert",
        surname: "Camus",
        age: 50,
        books: [
            { id: "1", title: "Test Title", score: 9, isPublished: false },
            { id: "2", title: "Deneme Title", score: 5, isPublished: true }
        ]
    },
    {
        id: "2",
        name: "İsmail Can",
        surname: "Karataş",
        age: 19,
        books: null
    },
];

const books = [
    {
        id: "1",
        title: "Yabanci",
        author_id: "1",
        score: 6.9,
        isPublished: true
    },
    {
        id: "2",
        title: "Yabanci 2",
        author_id: "1",
        score: 7,
        isPublished: true
    },
    {
        id: "3",
        title: "Deneme Kitap",
        author_id: "2",
        score: 6,
        isPublished: false
    }
];

module.exports = {
    authors,
    books
}