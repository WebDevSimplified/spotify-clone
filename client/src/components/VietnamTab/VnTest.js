import { BrowseCategories } from 'react-spotify-api'

function VnTest() {
  return (
    <div>
        <BrowseCategories>
            {(categories, loading, error) => (
                categories ? (
                    categories.categories.items.map(category => (
                        <h1 key={category.id}>{category.name}</h1>
                    ))
                ) : null
            )}
        </BrowseCategories>
    </div>
  )
}

export default VnTest