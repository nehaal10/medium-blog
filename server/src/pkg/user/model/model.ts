export type User = {
    id :String
    name :String
    email_id :String
    password :String
    blogs :String[]
    blogs_ids :String[]
    is_active :Boolean 
    is_deleted :Boolean
    create_by :String
    created_on :Date
    updated_by :String
    updated_on :Date
}

export type useResPayload = {}