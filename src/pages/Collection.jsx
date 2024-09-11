import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products, search , showSearch} = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [productFilter,setProductFilter] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([])
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) =>{
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory =(e) =>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
  }
  else{
    setSubCategory(prev => [...prev,e.target.value])
  }
}


  const applyFilter = () =>{

    let productsCopy = products.slice()
    
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setProductFilter(productsCopy)

  }

  const sortProduct = () =>{
    let pfCopy = productFilter.slice();

    switch(sortType){
      case 'Low-High':
        setProductFilter(pfCopy.sort((a,b) => (a.price - b.price)));
        break;

      case 'High-Low':
        setProductFilter(pfCopy.sort((a,b) => (b.price - a.price)));
        break;
        
      default:
        applyFilter()
       break;   
    }
  }
 

  useEffect(()=>{
    applyFilter()
  },[category,subCategory,search,showSearch])

  useEffect(()=>{
    sortProduct()
  },[sortType])





  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter options */}
      <div className='min-w-60'>
        <p onClick={()=> setShowFilter(!showFilter)} className='my-2 flex text-xl items-center gap-2 cursor-pointer'>FILTERS
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : '' }`} src={assets.dropdown_icon} alt="" />
        </p>
        
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '': 'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
              </p>
              <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}  /> women
              </p>
              <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}  /> Kids
              </p>
          </div>
        </div>

        {/* SubCategory Filter */}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '': 'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
              </p>
              <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}  /> Bottomwear
              </p>
              <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}  /> Winterwear
              </p>
          </div>
        </div>        

      </div>



      {/* Right side */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}  />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by: Relavent</option>
              <option value="Low-High">Sort by: Low to High</option>
              <option value="High-Low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
              productFilter.map((item,index)=>(
                <ProductItem key={index} name={item.name} id={item._id} image={item.image} price={item.price}/>
              ))
          }
        </div>

      </div>
      
    </div>
  )
}

export default Collection
