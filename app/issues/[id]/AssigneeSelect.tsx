
"use client"
import { Select } from "@radix-ui/themes";

export default function AssigneeSelect() {
    return (
            <Select.Root>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="1">Mosh Hamedani</Select.Item>
                        <Select.Item value="2">Serhat Acar</Select.Item>
                    </Select.Group>
            </Select.Content>            
        </Select.Root>       
    );
}
