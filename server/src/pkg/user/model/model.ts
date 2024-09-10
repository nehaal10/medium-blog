export type User = {
    id :string
    name :string
    email_id :string
    password :string
    is_active :boolean 
    is_deleted :boolean
    create_by :string
    created_on :Date
    updated_by :string
    updated_on :Date
}

export type userResPayload = {
    id :string
    name :string
    email_id :string
    password :string
}