import { http } from '@/utils';

const checkHealth = async () => {
	return await http<string>('/health');
};

export { checkHealth };
