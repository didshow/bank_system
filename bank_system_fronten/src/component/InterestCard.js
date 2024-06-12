import React from 'react';
import { Card, Typography } from '@douyinfe/semi-ui';

const { Text } = Typography;

const InterestCard = ({ ssr }) => {
    ssr = 0.0387 * 1e18; // 将 ssr 设置为 18 位小数表示
    const periods = [
        { time: 30 * 24 * 60 * 60, label: '30 days' }, // 30 days
        { time: 90 * 24 * 60 * 60, label: '90 days' }, // 90 days
        { time: 180 * 24 * 60 * 60, label: '180 days' } // 180 days
    ];

    const calculateInterest = (amount, time) => {
        const annualRate = ssr / 1e18;
        const periodRate = Math.pow(1 + annualRate, time / (365 * 24 * 60 * 60)) - 1;
        return amount * periodRate;
    };

    return (
        <Card title="Interest Rates">
            {periods.map(period => (
                <div key={period.label} style={{ marginBottom: 16 }}>
                    <Text>{period.label}:</Text>
                    <Text>
                        Deposit 1 ETH: Get {(calculateInterest(1 * 1e18, period.time) / 1e18).toFixed(6)} ETH interest
                    </Text>
                </div>
            ))}
        </Card>
    );
};

export default InterestCard;
