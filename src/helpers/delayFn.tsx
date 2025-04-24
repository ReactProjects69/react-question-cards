export const delayFn = async (delay = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
};
