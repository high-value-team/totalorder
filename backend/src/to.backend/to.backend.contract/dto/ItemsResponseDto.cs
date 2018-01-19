namespace to.backend.contract.dto
{
    public class ItemsResponseDto
    {
        public class ItemDto {
            public string Id;
            public string Text;
        }
        
        public string Title;
        public ItemsResponseDto.ItemDto[] Items;
    }
}