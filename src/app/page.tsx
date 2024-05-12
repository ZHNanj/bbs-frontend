'use client';

import { useEffect, useState } from 'react';
import { checkHealth } from '@/apis/health';

const Index: React.FC = () => {
	const [data, setData] = useState('');
	useEffect(() => {
		const healthCheck = async () => {
			const data = await checkHealth().then((result) => {
				setData(result);
			});
		};
		healthCheck();
	}, []);

	return <>{data}</>;
};

export default Index;
