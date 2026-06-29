export interface paths {
  '/browse': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: {
          page?: number
          per_page?: number
        }
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        200: components['responses']['GetApiV1CollectionsDocumentsBrowseResponse']
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/highlights': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        200: components['responses']['GetApiV1CollectionsDocumentsHighlightsResponse']
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/suggest': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: {
          q?: string
        }
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        200: components['responses']['GetApiV1CollectionsDocumentsSuggestResponse']
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/recommendations': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: {
          id?: string
        }
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        200: components['responses']['GetApiV1CollectionsDocumentsRecommendationsResponse']
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/similar-search': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: {
          q?: string
        }
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        200: components['responses']['GetApiV1CollectionsDocumentsSimilarSearchResponse']
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/presets': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        200: components['responses']['GetApiV1CollectionsDocumentsPresetsResponse']
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
}
export type webhooks = Record<string, never>
export interface components {
  schemas: {
    GetApiV1CollectionsDocumentsBrowse: {
      facet_counts: {
        counts: {
          count: number
          value: string
        }[]
        field_name: string
        stats: {
          total_values: number
        }
        type: string
        field_label: string
        field_unit: string
      }[]
      found: number
      found_docs: number
      out_of: number
      page: number
      request_params: {
        collection_name: string
        first_q: string
        per_page: number
        q: string
      }
      search_time_ms: number
      hits: {
        found: number
        document: {
          _ai: {
            score: number
          }
          _common: {
            imageUrl: string
            releaseDate: string
          }
          _product: {
            id: string
            price: number
            productNumber: string[]
            shippingFree: boolean
            stock: number
            streamIds: string[]
          }
          _product_i18n: {
            categoryTree: {
              name: string
            }[]
            description: string
            manufacturer: string
            name: string
            properties: {
              Farbton: string[]
              Stoff: string[]
            }
          }
          id: string
        }
        highlight: Record<string, never>
        grouped: {
          document: {
            _ai: {
              score: number
            }
            _common: {
              imageUrl: string
              releaseDate: string
            }
            _product: {
              id: string
              price: number
              productNumber: string[]
              shippingFree: boolean
              stock: number
              streamIds: string[]
            }
            _product_i18n: {
              categoryTree: {
                name: string
              }[]
              description: string
              manufacturer: string
              name: string
              properties: {
                Farbton: string[]
                Stoff: string[]
              }
            }
            id: string
          }
          highlight: Record<string, never>
        }[]
        vector: boolean
      }[]
      extensions: unknown[]
    }
    GetApiV1CollectionsDocumentsHighlights: {
      searches: unknown[]
      querySuggestions: string[]
    }
    GetApiV1CollectionsDocumentsSuggest: ({
      /** @constant */
      kind: 'document'
      found: number
      llm: boolean
      hits: {
        highlighted: {
          _common_i18n: {
            url: string
          }
          _history: {
            salesCount: number
          }
          _product: {
            id: string
            price: number
            productNumber: string[]
          }
          _product_i18n: {
            categories: string[]
            categoryTree: {
              name: string
            }[]
            description: string
            manufacturer: string
            name: string
            properties: {
              Farbgruppe: string[]
            }
          }
          type: string
        }
      }[]
    } | {
      /** @constant */
      kind: 'facet._product_i18n.categoryTree.name'
      found: number
      field_name: string
      hits: {
        count: number
        highlighted: string
        value: string
      }[]
    } | {
      /** @constant */
      kind: 'query-completion'
      hits: {
        value: string
        highlighted: string
        score: number
        source: string
      }[]
    })[]
    GetApiV1CollectionsDocumentsRecommendations: {
      id: string
      type: string
      score: number
      document: {
        _ai: {
          score: number
        }
        _common: {
          imageUrl: string
          releaseDate: string
        }
        _product: {
          id: string
          price: number
          productNumber: string[]
          shippingFree: boolean
          stock: number
          streamIds: string[]
        }
        _product_i18n: {
          categoryTree: {
            name: string
          }[]
          description: string
          manufacturer: string
          name: string
          properties: {
            Farbton: string[]
            Stoff?: string[]
          }
        }
        id: string
      }
    }[]
    GetApiV1CollectionsDocumentsSimilarSearch: {
      q: string
      count: number
      hits: number
      highlighted: string
    }[]
    GetApiV1CollectionsDocumentsPresets: {
      id: string
      name: string
    }[]
  }
  responses: {
    /** @description 200 OK */
    GetApiV1CollectionsDocumentsBrowseResponse: {
      headers: {
        [name: string]: unknown
      }
      content: {
        'application/json': components['schemas']['GetApiV1CollectionsDocumentsBrowse']
      }
    }
    /** @description 200 OK */
    GetApiV1CollectionsDocumentsHighlightsResponse: {
      headers: {
        [name: string]: unknown
      }
      content: {
        'application/json': components['schemas']['GetApiV1CollectionsDocumentsHighlights']
      }
    }
    /** @description 200 OK */
    GetApiV1CollectionsDocumentsSuggestResponse: {
      headers: {
        [name: string]: unknown
      }
      content: {
        'application/json': components['schemas']['GetApiV1CollectionsDocumentsSuggest']
      }
    }
    /** @description 200 OK */
    GetApiV1CollectionsDocumentsRecommendationsResponse: {
      headers: {
        [name: string]: unknown
      }
      content: {
        'application/json': components['schemas']['GetApiV1CollectionsDocumentsRecommendations']
      }
    }
    /** @description 200 OK */
    GetApiV1CollectionsDocumentsSimilarSearchResponse: {
      headers: {
        [name: string]: unknown
      }
      content: {
        'application/json': components['schemas']['GetApiV1CollectionsDocumentsSimilarSearch']
      }
    }
    /** @description 200 OK */
    GetApiV1CollectionsDocumentsPresetsResponse: {
      headers: {
        [name: string]: unknown
      }
      content: {
        'application/json': components['schemas']['GetApiV1CollectionsDocumentsPresets']
      }
    }
  }
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}
export type $defs = Record<string, never>
export type operations = Record<string, never>
