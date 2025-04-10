book.h
#ifndef BOOK_H
#define BOOK_H

#include <string>

class Book {
private:
    std::string title;
    std::string firstName;
    std::string lastName;
    int yearPublished;

public:
    Book();
    Book(const std::string &t, const std::string &f, const std::string &l, int y);

    // Getters
    std::string getTitle() const;
    std::string getFirstName() const;
    std::string getLastName() const;
    int getYear() const;

    // Compare by last name (if tie, you can compare firstName or title)
    bool operator<(const Book &other) const;
};

#endif

book.cc
#include "Book.h"

// Default constructor
Book::Book() : title(""), firstName(""), lastName(""), yearPublished(0) {}

// Parameterized constructor
Book::Book(const std::string &t, const std::string &f,
           const std::string &l, int y)
    : title(t), firstName(f), lastName(l), yearPublished(y) {}

// Getters
std::string Book::getTitle() const {
    return title;
}

std::string Book::getFirstName() const {
    return firstName;
}

std::string Book::getLastName() const {
    return lastName;
}

int Book::getYear() const {
    return yearPublished;
}

// Compare by lastName (secondary by firstName if desired)
bool Book::operator<(const Book &other) const {
    // Compare last names first
    if (this->lastName != other.lastName) {
        return (this->lastName < other.lastName);
    } else {
        // if last names are the same, compare first names
        return (this->firstName < other.firstName);
    }
}

linkedlist.h
#ifndef LINKEDLIST_H
#define LINKEDLIST_H

#include "Book.h"

class LinkedList {
private:
    struct Node {
        Book data;
        Node* next;
        Node(const Book &b) : data(b), next(nullptr) {}
    };

    Node* head;

public:
    LinkedList();
    ~LinkedList();

    // Insert a Book, keeping the list sorted by author's lastName
    void insertInOrder(const Book &b);

    // Print everything
    void print() const;
};

#endif

linkedlist.cc
#include <iostream>
#include "LinkedList.h"

LinkedList::LinkedList() : head(nullptr) {}

LinkedList::~LinkedList() {
    Node* curr = head;
    while (curr) {
        Node* temp = curr;
        curr = curr->next;
        delete temp;
    }
}

void LinkedList::insertInOrder(const Book &b) {
    Node* newNode = new Node(b);

    // If list is empty, or new book < head book, insert at head
    if (!head || (newNode->data < head->data)) {
        newNode->next = head;
        head = newNode;
        return;
    }

    // Otherwise find insertion point
    Node* curr = head;
    while (curr->next && !(newNode->data < curr->next->data)) {
        curr = curr->next;
    }
    // Insert after 'curr'
    newNode->next = curr->next;
    curr->next = newNode;
}

void LinkedList::print() const {
    Node* curr = head;
    while (curr) {
        std::cout << curr->data.getTitle() << " by "
                  << curr->data.getFirstName() << " "
                  << curr->data.getLastName()
                  << " (" << curr->data.getYear() << ")\n";
        curr = curr->next;
    }
}

main.cc
#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include "LinkedList.h"

int main() {
    LinkedList list;
    std::ifstream fin("books.txt");
    if (!fin.is_open()) {
        std::cerr << "Error: Could not open books.txt\n";
        return 1;
    }

    std::string line;
    while (std::getline(fin, line)) {
        // Each line: "TITLE, FIRSTNAME LASTNAME, YEAR"
        // We'll parse this using std::stringstream
        std::stringstream ss(line);

        std::string title, authorFull, yearStr;
        // We expect each piece to be separated by a comma
        // 1) Title
        if (!std::getline(ss, title, ',')) continue;
        // 2) Author's full name
        if (!std::getline(ss, authorFull, ',')) continue;
        // 3) Year
        if (!std::getline(ss, yearStr)) continue;

        // Trim leading spaces
        if (!title.empty() && title[0] == ' ') title.erase(0, 1);
        if (!authorFull.empty() && authorFull[0] == ' ') authorFull.erase(0, 1);
        if (!yearStr.empty() && yearStr[0] == ' ') yearStr.erase(0, 1);

        int year = std::stoi(yearStr);

        // Now, separate author's firstName / lastName
        // We assume the authorFull is something like "J.R.R. Tolkien"
        // We'll try to parse out the last "word" as lastName
        std::stringstream nameSS(authorFull);
        std::string token, firstName, lastName;

        // We'll gather everything until the final token as firstName,
        // then final token as lastName
        // e.g. "J.R.R." -> firstName, "Tolkien" -> lastName
        // (If you have multiple spaced names, you might refine logic)
        while (nameSS >> token) {
            // Keep overwriting lastName
            lastName = token;
            if (!firstName.empty()) {
                firstName += " ";
            }
            firstName += token;
        }

        // But we ended up with firstName = "J.R.R. Tolkien" if it's 2 tokens
        // Let's fix that: lastName is the final token. We'll remove it from firstName.
        // A simpler approach is track tokens in a vector, but let's do a quick manual fix:
        // If lastName is "Tolkien", remove that from the end of firstName
        // "J.R.R. Tolkien" -> "J.R.R."
        // This is simplistic and might break if the name has extra spaces, but works for a typical case.
        size_t pos = firstName.rfind(" ");
        if (pos != std::string::npos) {
            // everything after pos+1 is lastName
            firstName = firstName.substr(0, pos);
        }

        // Now we insert into the list
        Book newBook(title, firstName, lastName, year);
        list.insertInOrder(newBook);
    }

    // Done reading
    fin.close();

    // Print the list
    std::cout << "Books in ascending order by last name:\n";
    list.print();

    return 0;
}

