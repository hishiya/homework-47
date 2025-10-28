import { useForm } from 'react-hook-form';

export const UserForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
    })


    const onSubmit = (data) => {
        try {
            const dataToSave = {
                ...data,
                birthday: data.birthday.toISOString().split('T')[0],
            };

            localStorage.setItem('userData', JSON.stringify(dataToSave))
            console.log("Ви молодці, зачекайте поки вам зателефонує наш менеджер")
        } catch (error) {
            console.error('Виникла помилка при збереженні даних', error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='container'>
            <div>
                <label htmlFor="phone">Номер телефону:</label>
                <input 
                id='phone'
                type='tel'
                {...register('phone', {
                    required: "Номер телефону є обов'язковим полем",
                    pattern: {
                        value: /^\+?3?8?(0\d{9})$/,
                        message: 'Неккоректний номер телефону формат (0XXXXXXXXX)',

                    },
                })} />
                {errors.phone && <p style={{color: 'red'}}> {errors.phone.message} </p>}
            </div>

            <div>
                <label htmlFor='birthday'>Дата народження:</label>
                <input 
                id='birthday'
                type='date'
                {...register('birthday', {
                    required: "Дата народження є обов'язковою",
                    valueAsDate: true,
                    validate: (value) => {
                        return value <= new Date() || 'Дата народження не може бути у майбутньому';
                    },
                })}
                />
                {errors.birthday && <p style={{color: 'red'}}> {errors.birthday.message} </p>}
            </div>
            <button type='submit'>Зберегти</button>
        </form>
    )
}

