interface userReq {
    name: string,
    surname: string,
    patronymic: string,
    nameEng: string,
    surnameEng: string,
    scientificDegree: string,
    academicStatus: string,
    position: string,
    educationalQualificationLevel: string,
    speciality: string,
    faculty: string,
    theseName: string,
    formOfParticipation: string,
    arrivalDate: string,
    departureDate: string,
    phone: string,
    email: string           
}

const tableKeys = {
    surname: 'Прізвище',
    name: 'Ім’я',
    patronymic: 'По батькові',
    scientificDegree: 'Наукова ступінь',
    academicStatus: 'Вчене звання',
    position: 'Місце роботи/навчання',
    educationalQualificationLevel: 'Освітньо-кваліфікаційний рівень',
    speciality: 'Спеціальність',
    faculty: 'Факультет',
    theseName: 'Назва доповіді',
    formOfParticipation: 'Форма участі',
    arrivalDate: 'Дата приїзду',
    departureDate: 'Дата від’їзду',
    phone: 'Контактний телефон',
    email: 'Електронна адреса'
}

const mergeAuthors = (user: userReq[]) => {
    let authorsReq: any[] = [],
        tableIndex = 7

    for (let i = 0; i < user.length; i++) {
        authorsReq.push(
            {
                insertText: {
                    location: {
                        index: tableIndex
                    },
                    //@ts-ignore
                    text: `Автор ${i + 1}`
                }
            }              
        ) 
        if (i === user.length - 1)
            tableIndex = tableIndex + 3
        else
            tableIndex = tableIndex + 2   
    }  

    for (const key in tableKeys) {
        authorsReq.push(
            {
                updateParagraphStyle: {
                    paragraphStyle: {
                        alignment: 'START'
                    },
                    range: {
                        startIndex: tableIndex,
                        //@ts-ignore
                        endIndex: tableIndex + tableKeys[key].length + 1
                    },
                    fields: 'alignment'
                }
            }              
        )
        authorsReq.push(
            {
                insertText: {
                    location: {
                        index: tableIndex
                    },
                    //@ts-ignore
                    text: tableKeys[key]
                }
            }              
        )
        tableIndex = tableIndex + 2
        for (let i = 0; i < user.length; i++) {
            authorsReq.push(
                {
                    insertText: {
                        location: {
                            index: tableIndex
                        },
                        //@ts-ignore
                        text: user[i][key] || '-'
                    }
                }              
            )
            if (i === user.length - 1)
                tableIndex = tableIndex + 3
            else
                tableIndex = tableIndex + 2   
        }          
    }
    authorsReq.push({
        updateTextStyle: {
            range: {
                startIndex: 1,
                endIndex: tableIndex - 3
            },
            textStyle: {
                weightedFontFamily: {
                    fontFamily: 'Times New Roman',
                    weight: 400
                },
                fontSize: {
                    magnitude: 13,
                    unit: 'PT'
                }
            },
            fields: 'weightedFontFamily, fontSize'
        }  
    })
    authorsReq.push({
        updateParagraphStyle: {
            paragraphStyle: {
                lineSpacing: 115,
                alignment: 'CENTER'
            },
            range: {
                startIndex: 1,
                endIndex: tableIndex - 3    
            },
            fields: 'lineSpacing, alignment'
        }
    })
    return authorsReq.reverse()
}

export default (user: userReq[]): any[] => {
    return [
        {
            updateDocumentStyle: {
                documentStyle: {
                    pageSize: {
                        height: {
                            magnitude: 595.2755905511812,
                            unit: 'PT'
                        },
                        width: {
                            magnitude: 841.8897637795277,
                            unit: 'PT'                          
                        }
                    },
                    marginLeft: {
                        magnitude: 36,
                        unit: 'PT'           
                    },
                    marginTop: {
                        magnitude: 36,
                        unit: 'PT'           
                    },
                    marginRight: {
                        magnitude: 36,
                        unit: 'PT'           
                    },
                    marginBottom: {
                        magnitude: 36,
                        unit: 'PT'           
                    },                    
                },
                fields: 'pageSize, marginLeft, marginTop, marginRight, marginBottom'
            }
        },
        {
            insertTable: {
                endOfSegmentLocation: {
                    segmentId: ''
                },
                columns: user.length + 1,
                rows: 16
            }
        },
        ...mergeAuthors(user),
        {
            insertText: {
                location: {
                    index: 1
                },
                text: 'Заявка на участь в конференції\n'
            }             
        },
        {
            updateTextStyle: {
                range: {
                    startIndex: 1,
                    endIndex: ('Заявка на участь в конференції').length + 1
                },
                textStyle: {
                    bold: true,
                    fontSize: {
                        magnitude: 16,
                        unit: 'PT'
                    }
                },
                fields: 'bold, fontSize'                
            }
        },
        {
            updateParagraphStyle: {
                paragraphStyle: {
                    alignment: 'CENTER'
                },
                range: {
                    startIndex: 1,
                    endIndex: ('Заявка на участь в конференції').length + 1
                },
                fields: 'alignment'
            }
        }
    ]
}