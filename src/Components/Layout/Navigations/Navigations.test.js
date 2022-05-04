import React from 'react';
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navigations from './Navigations'
import Navigation from './Navigation/NavigationItem'

configure({adapter:new Adapter()})

describe('<Navigations />',()=>{
    let wapper;
    beforeEach(()=>
    wapper=shallow(<Navigations />)
    )

    it('should render two <Navigation/> element if there is no authentication',()=>{
        
        expect(wapper.find(Navigation)).toHaveLength(2);
    })
    it('should render three <Navigation/> element if there is authentication',()=>{
        wapper.setProps({token:true})
        expect(wapper.find(Navigation)).toHaveLength(3);
    })
}





)