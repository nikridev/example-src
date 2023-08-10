export function prepareData(currentElement, values) {
    return {
        ...currentElement,
        parentCode: null,
        code: values.code,
        fullName: values.fullName,
        shortName: values.shortName,
        orderNumber: Number(values.orderNumber),
        exclusionDate: values.dates[1] ? new Date(values.dates[1]).toISOString() : null,
        inclusionDate: values.dates[0] ? new Date(values.dates[0]).toISOString() : null,
    }
}