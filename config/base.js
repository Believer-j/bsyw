const isProduction = true

export const baseURL = () => {
	if (isProduction) {
		return 'https://bsyw.club'
		// return 'http://localhost:8061'
		// return 'http://localhost:8057'
		// return 'http://47.121.187.203:8057'
	} else {
		// return 'http://localhost:8061'
		// return 'http://localhost:8061'
		// return 'http://localhost:8057'
		return 'http://47.121.187.203:8057'
	}
}

export const VERSION = 1;