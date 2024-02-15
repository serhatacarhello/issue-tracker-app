
"use client"

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AssigneeSelect() {

    const [users, setUsers] = useState<User[]>([])
    console.log("🚀 ~ AssigneeSelect ~ users:", users)

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get<User[]>('/api/users')
            console.log("🚀 ~ fetchUsers ~ data:", data)
            setUsers(data)
        }

        fetchUsers()
    }, [])

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users.map(user => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)
                    )}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
}
