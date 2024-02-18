"use client"

import { Card } from '@radix-ui/themes';
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';


interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

export default function IssueChart({ closed, inProgress, open }: Props) {
    const data = [
        {
            label: 'Open', value: open,
        },
        {
            label: 'In Progress', value: inProgress,
        },
        {
            label: 'Closed', value: closed,

        },
    ];




    return (
        <Card className='bg-gray-500'>
            <ResponsiveContainer width={'100%'} height={300}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" barSize={60} stackId="a" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}
