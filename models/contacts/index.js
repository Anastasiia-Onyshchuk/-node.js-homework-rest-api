// const fs = require('fs/promises')
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts", "contacts.json");
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}

export const getContactById = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
};

export const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
};

export const updateCotactById = async (id, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { ...contacts[index], ...data };
    await updateContacts(contacts);
    return contacts[index]
}
export const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }  
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}



// module.exports = {
//   listContacts,
//   getContactById,
//   addContact,
//   updateCotactById,
//   removeContact,
// }



// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from "nanoid";

// const moviesPath = path.resolve("models", "movies", "movies.json");

// const updateMovies = movies => fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));

// export const getAllMovies = async () => {
//     const data = await fs.readFile(moviesPath);
//     return JSON.parse(data);
// }

// export const getMovieById = async (id) => {
//     const movies = await getAllMovies();
//     const result = movies.find(item => item.id === id);
//     return result || null;
// }

// export const addMovie = async (data) => {
//     const movies = await getAllMovies();
//     const newMovie = {
//         id: nanoid(),
//         ...data,
//     };
//     movies.push(newMovie);
//     await updateMovies(movies);
//     return newMovie;
// }

// export const updateMovieById = async (id, data) => {
//     const movies = await getAllMovies();
//     const index = movies.findIndex(item => item.id === id);
//     if (index === -1) {
//         return null;
//     }
//     movies[index] = { ...movies[index], ...data };
//     await updateMovies(movies);
//     return movies[index];
// }

// export const deleteById = async (id) => {
//     const movies = await getAllMovies();
//     const index = movies.findIndex(item => item.id === id);
//     if (index === -1) {
//         return null;
//     }
//     const [result] = movies.splice(index, 1);
//     await updateMovies(movies);
//     return result;
// }