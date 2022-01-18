interface docsReq {
    theseName: string,
    theseNameEng: string,
    summary: string,
    summaryEng: string,
    keyWords: string,
    keyWordsEng: string,
    authors: [
        {
            name: string,
            surname: string,
            patronymic: string,
            nameEng: string,
            surnameEng: string,           
        } 
    ]
}

const setAuthorNames = (authors: any) => {
    let str = ''

    for (let author of authors) {
        if (str.length > 0)
            str += ', '
        if (author.scientificDegree)
            str += `${author.scientificDegree.toLowerCase()}, `
        if (author.academicStatus)
            str += `${author.academicStatus.toLowerCase()}, `
        str += `${author.name[0]}. ${author.patronymic[0]}. ${author.surname}`
    }

    return str
}

const setAuthorNamesEng = (authors: any) => {
    let str = ''

    for (let author of authors) {
        if (str.length > 0)
            str += ', '
        str += `${author.surnameEng} ${author.nameEng}`
    }

    return str
}

const centerText = (arr: any[], text: string): object | undefined => {
    for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i].paragraph) {
            if (arr[i].paragraph.elements) {
                if (arr[i].paragraph.elements[0].textRun) {
                    const word = arr[i].paragraph.elements[0].textRun.content
                    if (word.toLowerCase().replace('\n','') === text.toLowerCase()) {
                        return {
                            updateParagraphStyle: {
                                paragraphStyle: {
                                    alignment: 'CENTER'
                                },
                                range: {
                                    startIndex: arr[i].paragraph.elements[0].startIndex,
                                    endIndex: arr[i].paragraph.elements[0].endIndex    
                                },
                                fields: 'alignment'
                            }               
                        }
                    }                 
                }
            }
        }
    }
    return undefined
}

export default (body: any[], data: docsReq) => {
    const lastIndex = body[body.length - 1].endIndex - 1
    return [
        //all doc styles
        {
            updateTextStyle: {
                range: {
                    startIndex: 1,
                    endIndex: lastIndex
                },
                textStyle: {
                    fontSize: {
                        magnitude: 13,
                        unit: 'PT'
                    }
                },
                fields: 'fontSize'
            }
        },
        {
            updateParagraphStyle: {
                paragraphStyle: {
                    lineSpacing: 115,
                    indentFirstLine: {
                        magnitude: 28.35,
                        unit: 'PT'
                    },
                    alignment: 'JUSTIFIED'
                },
                range: {
                    startIndex: 1,
                    endIndex: lastIndex    
                },
                fields: 'lineSpacing, indentFirstLine, alignment'
            }
        },
        centerText(body, 'джерела'),

        //endtext
        {
            insertText: {
                location: {
                    index: lastIndex
                },
                text: `Keywords: ${data.keyWordsEng}`
            }
        },
        {
            updateTextStyle: {
                range: {
                    startIndex: lastIndex,
                    endIndex: ('Keywords:').length + lastIndex
                },
                textStyle: {
                    bold: true
                },
                fields: 'bold'                
            }
        },
        {
            updateTextStyle: {
                range: {
                    startIndex: lastIndex,
                    endIndex: (`Keywords: ${data.keyWordsEng}`).length + lastIndex
                },
                textStyle: {
                    fontSize: {
                        magnitude: 14,
                        unit: 'PT'
                    }
                },
                fields: 'fontSize'
            }
        },
        {
            updateParagraphStyle: {
                paragraphStyle: {
                    lineSpacing: 115,
                },
                range: {
                    startIndex: lastIndex,
                    endIndex: (`Keywords: ${data.keyWordsEng}`).length + lastIndex
                },
                fields: 'lineSpacing'
            }     
        },

        {
            insertText: {
                location: {
                    index: lastIndex
                },
                text: `${data.summaryEng}\n\n`
            }      
        },
        {
            updateTextStyle: {
                range: {
                    startIndex: lastIndex,
                    endIndex: (`${data.summaryEng}`).length + lastIndex
                },
                textStyle: {
                    fontSize: {
                        magnitude: 14,
                        unit: 'PT'
                    },
                    bold: false
                },
                fields: 'fontSize, bold'
            }
        },

        {
            insertText: {
                location: {
                    index: lastIndex
                },
                text: `${data.theseNameEng}\n\n`
            }                 
        },
        {
            updateTextStyle: {
                range: {
                    startIndex: lastIndex,
                    endIndex: (`${data.theseNameEng}`).length + lastIndex
                },
                textStyle: {
                    fontSize: {
                        magnitude: 14,
                        unit: 'PT'
                    }
                },
                fields: 'fontSize'
            }
        },

        {
            insertText: {
                location: {
                    index: lastIndex
                },
                text: `\n${setAuthorNamesEng(data.authors)}\n\n`
            }             
        },
        {
            updateTextStyle: {
                range: {
                    startIndex: lastIndex,
                    endIndex: setAuthorNamesEng(data.authors).length + 1 + lastIndex
                },
                textStyle: {
                    fontSize: {
                        magnitude: 14,
                        unit: 'PT'
                    },
                    bold: true
                },
                fields: 'fontSize, bold'            
            }
        },

        //start text
        {
            insertText: {
                location: {
                    index: 1
                },
                text: `Ключові слова: ${data.keyWords}\n\n`
            }                      
        },
        {
            updateTextStyle: {
                range: {
                    startIndex: 1,
                    endIndex: ('Ключові слова:').length + 1
                },
                textStyle: {
                    bold: true
                },
                fields: 'bold'                
            }
        },
        {
            updateTextStyle: {
                range: {
                    startIndex: 1,
                    endIndex: (`Ключові слова: ${data.keyWords}`).length + 1
                },
                textStyle: {
                    fontSize: {
                        magnitude: 12,
                        unit: 'PT'
                    },
                    italic: true
                },
                fields: 'fontSize, italic'            
            }
        },
        {
            updateParagraphStyle: {
                paragraphStyle: {
                    indentFirstLine: {
                        magnitude: 0,
                        unit: 'PT'
                    },
                },
                range: {
                    startIndex: 1,
                    endIndex: (`Ключові слова: ${data.keyWords}`).length + 1
                },
                fields: 'indentFirstLine'
            }     
        },

        {
            insertText: {
                location: {
                    index: 1
                },
                text: `${data.summary}\n\n`
            }             
        },
        {
            updateTextStyle: {
                range: {
                    startIndex: 1,
                    endIndex: (`${data.summary}`).length + 1
                },
                textStyle: {
                    fontSize: {
                        magnitude: 12,
                        unit: 'PT'
                    },
                    italic: true,
                    bold: false
                },
                fields: 'fontSize, italic, bold'            
            }         
        },

        {
            insertText: {
                location: {
                    index: 1
                },
                //@ts-ignore
                text: `${data.authors[0].position}, Україна\n\n`
            }           
        },
        {
            updateTextStyle: {
                range: {
                    startIndex: 1,
                    //@ts-ignore
                    endIndex: (`${data.authors[0].position}, Україна`).length + 1
                },
                textStyle: {
                    fontSize: {
                        magnitude: 13,
                        unit: 'PT'
                    },
                    italic: false,
                },
                fields: 'fontSize, italic'            
            }         
        },
        {
            updateParagraphStyle: {
                paragraphStyle: {
                    alignment: 'CENTER'
                },
                range: {
                    startIndex: 1,
                    endIndex: ('Одеський національний морський університет, Україна').length + 1
                },
                fields: 'alignment'
            }
        },

        {
            insertText: {
                location: {
                    index: 1
                },
                text: `${setAuthorNames(data.authors)}\n`
            }              
        },

        {
            insertText: {
                location: {
                    index: 1
                },
                text: `${data.theseName}\n\n`
            }               
        },
        {
            updateTextStyle: {
                range: {
                    startIndex: 1,
                    endIndex: (`${data.theseName}`).length + 1
                },
                textStyle: {
                    fontSize: {
                        magnitude: 14,
                        unit: 'PT'
                    },
                    bold: true,
                },
                fields: 'fontSize, bold'            
            }         
        }
    ]
}