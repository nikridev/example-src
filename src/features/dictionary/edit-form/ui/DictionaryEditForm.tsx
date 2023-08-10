import React from 'react';
import {useFieldArray, useWatch} from 'react-hook-form';

import {
    Autocomplete,
    Button,
    ButtonDropdown,
    Form,
    FormField,
    FormSubmitHandler,
    TextField,
    validators,
    useFormContext,
    Stack,
    CheckboxList
} from '@utils/ui-kit';

import {
    useGetDictionaryByIdQuery,
    useListDictionaryQuery,
    useUpdateDictionaryMutation,
} from '@ppm/shared/api';
import {ReactComponent as CheckIcon} from '@ppm/shared/assets/icons/check.svg';
import {ReactComponent as PlusIcon} from '@ppm/shared/assets/icons/plus.svg';

import {ButtonRemove, ErrorMessage, LabelField, Row, WrapperComplete} from '../../styled';

interface DictionaryAutocomplete {
    label: string;
    name: string;
    id?: number;
    dictId?: number;
    value?: string;
}

interface FormValues {
    name: string;
    code: string;
    features: {
        isHierarchical: boolean;
    };
    relatedDictionaries: Array<DictionaryAutocomplete>;
}

interface Props {
    dictionaryId?: number;
    onCancel?: any;
    onSuccess?: any;
}

export function DictionaryEditForm(props: Props) {
    const {dictionaryId, onCancel, onSuccess} = props;
    const {data} = useGetDictionaryByIdQuery({
        variables: {
            input: Number(dictionaryId),
        },
        // TODO: don't disable cache
        fetchPolicy: 'network-only',
        skip: !dictionaryId,
    });
    const {data: dictionariesList} = useListDictionaryQuery({
        variables: {input: {codesNotIn: [data?.dictionaryById.code || '']}},
        skip: !data?.dictionaryById,
    });
    const [updateDictionary, {loading: updateDictionaryLoading}] = useUpdateDictionaryMutation();

    const relatedDictionariesData =
        dictionariesList?.listDictionary.map((dictionary) => ({
            label: `${dictionary.name} (${dictionary.code})`,
            value: dictionary.code,
            name: dictionary.name,
            id: dictionary.id,
        })) || [];

    const [defaultValues, setDefaultValues] = React.useState<FormValues>();

    const handleSubmit: FormSubmitHandler<FormValues> = async ({values}) => {
        const prepared = {
            active: true,
            code: values.code,
            hierarchy: values.features.isHierarchical,
            id: dictionaryId,
            name: values.name,
            relatedDictionaries: values.relatedDictionaries.map((dict) => ({
                name: dict.name,
                id: dict.dictId,
            })),
        };
        await updateDictionary({variables: {input: prepared}});
        onSuccess();
    };

    React.useEffect(() => {
        if (data?.dictionaryById && dictionariesList?.listDictionary) {
            let relatedDictionaries: Array<DictionaryAutocomplete> = [];
            if (data.dictionaryById.relatedDictionaries) {
                relatedDictionaries = data.dictionaryById.relatedDictionaries.map((dict) => {
                    return {
                        label: `${dict.name} (${dict.code})`,
                        name: dict.name || '',
                        id: dict.id || 0,
                        dictId: dict.id || 0,
                    };
                });
            }
            setDefaultValues({
                name: data.dictionaryById.name,
                code: data.dictionaryById.code || '',
                features: {
                    isHierarchical: data.dictionaryById.hierarchy,
                },
                relatedDictionaries,
            });
        }
    }, [data, dictionariesList]);

    if (!defaultValues) {
        return null;
    }

    return (
        <div>
            <Form onSubmit={handleSubmit} defaultValues={defaultValues} formName="dictionary-edit-form">
                <FormField
                    twoColumns={false}
                    name="name"
                    label="Название"
                    rules={{...validators.requiredField()}}
                >
                    <TextField fullWidth/>
                </FormField>
                <FormField twoColumns={false} name="code" label="Код">
                    <TextField fullWidth disabled/>
                </FormField>
                <FormField twoColumns={false} name="features" label="Особенности">
                    <CheckboxList list={[{key: 'isHierarchical', label: 'Иерархический'}]}/>
                </FormField>
                <WarningChangeFeatures
                    values={{
                        hierarchy: Boolean(data?.dictionaryById.hierarchy),
                    }}
                />
                <RelatedDictionary
                    options={relatedDictionariesData}
                    isRelated={Boolean(data?.dictionaryById.relatedDictionaries?.length)}
                />
                <Stack direction={{xs: 'column', sm: 'row'}} spacing={1} sx={{marginTop: '32px'}}>
                    <Button
                        variant="contained"
                        startIcon={<CheckIcon/>}
                        type="submit"
                        loading={updateDictionaryLoading}
                    >
                        Сохранить
                    </Button>
                    <Button variant="outlined" onClick={onCancel}>
                        Отменить
                    </Button>
                </Stack>
            </Form>
        </div>
    );
}

function WarningChangeFeatures(props: { values: { hierarchy: boolean } }) {
    const {values} = props;
    const {control} = useFormContext();
    const features = useWatch({
        control,
        name: 'features',
    });

    return !features.isHierarchical && values.hierarchy ? (
        <ErrorMessage>Все дочерние элементы будут удалены</ErrorMessage>
    ) : null;
}

function RelatedDictionary(props: { options: any; isRelated: boolean }) {
    const {options, isRelated} = props;
    const {control} = useFormContext();
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'relatedDictionaries',
    });

    const itemClickHandler = (option: DictionaryAutocomplete) => {
        append({
            label: option.label,
            dictId: option.id,
            name: option.name,
        })
    }

    const itemsDropdown = options.map((option: DictionaryAutocomplete) => ({
        label: option.label,
        onClick: itemClickHandler(option)
    }));

    return (
        <div>
            {(fields.length > 0 || isRelated) && (
                <div>
                    <LabelField>Связанные справочники</LabelField>
                    {fields.map((field, index) => (
                        <Row key={field.id}>
                            <WrapperComplete>
                                <FormField twoColumns={false} name={`relatedDictionaries.${field.id}.label`}>
                                    <Autocomplete options={options}/>
                                </FormField>
                            </WrapperComplete>
                            <ButtonRemove onClick={() => remove(index)}>
                                <PlusIcon/>
                            </ButtonRemove>
                        </Row>
                    ))}
                </div>
            )}
            <ButtonDropdown
                icon={<PlusIcon/>}
                items={itemsDropdown}
                idPopover="dictionary-snippet"
                horizontal="right"
            >
                Добавить связанный справочник
            </ButtonDropdown>
        </div>
    );
}
