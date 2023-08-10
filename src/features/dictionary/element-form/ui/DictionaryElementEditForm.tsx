import {DateRange} from '@mui/lab/DateRangePicker/RangeTypes';
import Stack from '@mui/material/Stack';
import React from 'react';

import {
    Button,
    Form,
    FormField,
    FormSubmitHandler,
    TextField,
    validators,
} from '@utils/ui-kit';

import {ButtonWrapper, RowBottom, RowTop} from '@ppm/features/dictionary/styled';
import {
    DictionaryElement,
    useCreateDictionaryElementMutation,
    useUpdateDictionaryElementMutation,
} from '@ppm/shared/api';
import {ReactComponent as CheckIcon} from '@ppm/shared/assets/icons/check.svg';
import {DateRangePicker} from '@ppm/shared/ui';
import {prepareData} from "@ppm/features/dictionary/element-form/lib";

interface FormValues {
    code: string;
    orderNumber: number;
    shortName: string;
    fullName: string;
    dates: DateRange<string | null>;
}

interface Props {
    active?: boolean;
    dictionaryCode?: string;
    totalNumberOfItems?: number;
    isEdit?: boolean;
    element?: DictionaryElement;
    onCancel?: any;
    onSuccess?: any;
}

export function DictionaryElementEditForm(props: Props) {
    const {
        isEdit,
        element,
        onCancel,
        onSuccess,
    } = props;

    const [defaultValues] = React.useState(element);
    const [
        createDictionaryElement,
        {loading: createDictionaryElementLoading},
    ] = useCreateDictionaryElementMutation();
    const [
        updateDictionaryElement,
        {loading: updateDictionaryElementLoading},
    ] = useUpdateDictionaryElementMutation();

    const handleSubmit: FormSubmitHandler<FormValues> = async ({values}) => {
        const currentElement = {
            id: element.id,
            active: element.active,
            dictionaryCode: element.dictionaryCode,
        }

        const prepare = prepareData(currentElement, values);
        if (isEdit) {
            await updateDictionaryElement({variables: {input: {...prepare}}});
        } else {
            await createDictionaryElement({variables: {input: {...prepare}}});
        }
        onSuccess();
    };

    return (
        <Form
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            formName={`${isEdit ? 'update' : 'create'}DictionaryElementForm`}
        >
            {(methods) => (
                <>
                    <RowTop>
                        <FormField
                            twoColumns={false}
                            name="orderNumber"
                            label="Номер"
                            labelWidth="80px"
                            rules={{
                                ...validators.requiredField(),
                                pattern: {
                                    value: /^[+-]?\d+(\,\d+)?$/,
                                    message: 'Только числа',
                                },
                            }}
                        >
                            <TextField sx={{width: '80px'}}/>
                        </FormField>
                        <FormField
                            twoColumns={false}
                            name="code"
                            label="Код"
                            labelWidth="420px"
                            helperText="Латинские буквы, цифры, тире и нижнее подчёркивание"
                            rules={{
                                ...validators.requiredField(),
                                pattern: {
                                    value: /^[A-Za-z0-9_-]+$/,
                                    message: 'Латинские буквы, цифры, тире и нижнее подчёркивание',
                                },
                            }}
                        >
                            <TextField sx={{width: '420px'}}/>
                        </FormField>
                    </RowTop>
                    <FormField
                        twoColumns={false}
                        name="shortName"
                        label="Краткое наименование"
                        rules={{...validators.requiredField()}}
                    >
                        <TextField fullWidth/>
                    </FormField>
                    <FormField
                        twoColumns={false}
                        name="fullName"
                        label="Полное наименование"
                        rules={{...validators.requiredField()}}
                    >
                        <TextField fullWidth/>
                    </FormField>
                    <RowBottom>
                        <FormField twoColumns={false} name="dates" label="Срок действия">
                            <DateRangePicker startText="Бессрочно" endText="Бессрочно"/>
                        </FormField>
                        <ButtonWrapper>
                            <Button
                                onClick={() => {
                                    methods.setValue('dates', [null, null]);
                                }}
                            >
                                Сбросить
                            </Button>
                        </ButtonWrapper>
                    </RowBottom>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={1} sx={{marginTop: '32px'}}>
                        <Button
                            variant="contained"
                            loading={createDictionaryElementLoading || updateDictionaryElementLoading}
                            startIcon={<CheckIcon/>}
                            type="submit"
                        >
                            Сохранить
                        </Button>
                        <Button variant="outlined" onClick={onCancel}>
                            Отменить
                        </Button>
                    </Stack>
                </>
            )}
        </Form>
    );
}
