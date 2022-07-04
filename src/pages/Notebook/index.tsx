import SearchInput from 'components/SearchInput';
import { useState } from 'react';
import Table from './Table';

function Notebook() {
    const [searchValue, setSearchValue] = useState('');
    return (
        <div className='wrapper'>
            <div className='topbar'>
                <span>Sổ tay</span>
                <div className='search'>
                    <SearchInput
                        value={searchValue}
                        setValue={setSearchValue}
                        placeholder='Tìm sổ tay'
                    />
                </div>
            </div>
            <div className='header'></div>
            <div className='main'>
                <Table />
            </div>
        </div>
    );
}

export default Notebook;
