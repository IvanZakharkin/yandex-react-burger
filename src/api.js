
const URL = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredientsList = async () => {
    const res = await fetch(URL);
    const data = await res.json();

    if(!data.success) {
        throw new Error('При загрзки данныз произошла ошибка');
    }

    return data.data;
}
