export interface UserInterface {
    id: number,
    name: string,
    username: string
    created_at: string,
};


export interface UsersInterface {
    id: number,
    name: string,
    username: string,
    created_at: string,
    debt_formatted: string,
    debt: string
};

export interface CostsInterface {
    amount: string | number,
    created_at: string,
    created_at_jalali: string,
    description: string | null
    id: number,
    title: string,
    user: { id: number, name: string, username: string, created_at: string }
    users: [
        {
            amount: string
            created_at: string
            created_at_jalali: string
            description: null | string
            id: number
            debt: string
            name: string
            user_portion: number
            user_portion_amount: number
        }
    ]
};

export interface ChangePasswordFormInterface {
    prev_password: string,
    password: string,
    password_confirmation: string,
}

export interface CreateCostFormInterface {
    title: string,
    amount?: number,
    user_id: number | undefined,
    users_id: number[],
    date: string,
    description: null | string
}

export interface CreatePaymentsFormInterface {
    amount?: number,
    date: string,
    payer_user_id?: string | number,
    paid_user_id: string | number,
    description: null | string
}

export interface SearchFormInterface {
    search: string,
    from_date: string,
    to_date: string
    filter_search: string[],
}

export interface pageCostsInterface {
    data: CostsInterface[],
    links: {
        first: string | null,
        last: string | null,
        next: string | null,
        prev: string | null,
    },
    meta: {
        current_page: number
        from: number
        last_page: number
        links: { active: boolean, label: string, url: string | null }[]
        path: string
        per_page: number
        to: number
        total: number
    }
}

export interface PagePaymentsInterface {
    data: PaymentsDataInterface[]
    links: {
        first: string | null,
        last: string | null,
        next: string | null,
        prev: string | null,
    },
    meta: {
        current_page: number
        from: number
        last_page: number
        links: { active: boolean, label: string, url: string | null }[]
        path: string
        per_page: number
        to: number
        total: number
    }
}

export interface PaymentsDataInterface {
    amount: number
    amount_formatted: string
    created_at: string
    created_at_jalali: string
    description: string | null
    id: number
    paid: { id: number, name: string, username: string, created_at: string }
    payer: { id: number, name: string, username: string, created_at: string }
}

export interface AddUserFormInterface {
    name: string,
    username: string,
    password: string,
    password_confirmation: string
}






