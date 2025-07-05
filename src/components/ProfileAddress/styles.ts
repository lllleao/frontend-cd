import styled from 'styled-components'

export const AddressContainer = styled.div<{$isSelect?: boolean}>`
    background-color: #3f3f3f;
    max-width: fit-content;
    padding: 1rem;
    margin: 3rem 0;
    border-radius: 1rem;
    transform: ${({ $isSelect }) => $isSelect ? 'scale(105%)': 'scale(100%)'};
    transition: transform .3s ease-in;

    .header-address {
        display: flex;
        justify-content: space-between;
        .address-card {
            margin-bottom: 1rem;
        }
        .edit-address {
            cursor: pointer;
            padding: 0.5rem;
            margin-bottom: 0.5rem;
        }
    }

    .card-address {
        display: flex;
        align-items: center;
    }

    .fa-house {
        font-size: 3rem;
        margin-right: 1.5rem;
    }

    .fa-building {
        font-size: 4rem;
        margin-right: 1.5rem;
    }

    .address {
        .rua-num {
            display: flex;
            gap: 2rem;
            margin-bottom: 1rem;
        }
        .tag {
            font-weight: bold;
            font-size: 1.1rem;
        }
        .address-info {
            margin: 1rem 0;
        }
        .cep {
            margin-bottom: 0.5rem;
        }
    }
`
