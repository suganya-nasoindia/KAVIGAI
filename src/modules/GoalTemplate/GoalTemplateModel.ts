export interface GoalTemplate {
//     "serialNo": 1,
//     "goalTemplateID": 95,
//     "authorName": "mfirst",
//     "authorFirstName": "Kavigai",
//     "authorLastName": "Author",
//     "goalName": "To become a successful Backend Developer in t",
//     "goalType": "GOALTEMPLATE",
//     "goalDuration": 90,
//     "goalUrl": "www.kavigai.com",
//     "goalImageUrl": "",
//     "goalDescription": "To become a successful Backend Developer in the MEAN Stack (MongoDB, Express.js, Angular, Node.js),",
//     "tags": [
//         "Backend ",
//         "MEAN",
//         "Full stack"
//     ],
//     "price": "FREE",
//     "amount": 0,
//     "discount": 0,
//     "currencyType": "INR",
//     "rating": "Goal 1.0",
//     "popularity": "Recommended by Mentors",
//     "category": "Internship, backend,development",
//     "goalStatus": 2,
//     "published": true,
//     "archived": false
// }

    serialNo?: number;
    goalTemplateID?: number;
    authorName?: string;
    authorFirstName?: string;
    authorLastName?: string;
    goalName?: string;
    goalType?: string;
    goalDuration?: number;
    goalUrl?: string;
    goalImageUrl?: string;
    goalDescription?: string;
    tags?: string[];
    price?: string;
    amount?: number;
    discount?: number;
    currencyType?: string;
    rating?: string;
    popularity?: string;
    category?: string;
    goalStatus?: number;
    published?: boolean;
    archived?: boolean;
}