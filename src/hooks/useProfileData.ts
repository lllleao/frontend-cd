import { GetAddressProps } from '@/interfaces/interfaces'
import { create } from 'zustand'

interface ProfileData {
    address: GetAddressProps[]
    nameAndEmail: { name: string | undefined; email: string | undefined }
    setProfileAddress: (address: GetAddressProps[] | undefined) => void
    setProfileNameEmail: (nameAndEmail: {
        name: string | undefined
        email: string | undefined
    }) => void
}

export const useProfileData = create<ProfileData>((set) => ({
    address: [
        {
            name: 'Nome Completo',
            cpf: '00000000000',
            zipCode: '00000000',
            street: 'Padrão',
            neighborhood: 'Padrão',
            complement: 'Complemento Padrão',
            number: '123A',
            isDefault: false,
            id: 1
        },
        {
            name: 'Nome Completo',
            cpf: '00000000000',
            zipCode: '00000000',
            street: 'Padrão',
            neighborhood: 'Padrão',
            complement: 'Complemento Padrão',
            number: '123A',
            isDefault: false,
            id: 2
        }
    ],
    nameAndEmail: {
        name: 'Carregando...',
        email: 'Carregando...'
    },

    setProfileAddress: (address: GetAddressProps[] | undefined) =>
        set({
            address
        }),
    setProfileNameEmail: (nameAndEmail: {
        name: string | undefined
        email: string | undefined
    }) =>
        set({
            nameAndEmail
        })
}))
