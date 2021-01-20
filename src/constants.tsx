export const GRAPHQL_API = "http://localhost:8081/"
export const GET_USERS_QUERY=`
query users {
    users {
        id
        email
        password
    }
}`