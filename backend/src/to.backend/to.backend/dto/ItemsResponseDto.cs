namespace to.backend.dto
{
    public class ItemsResponseDto
    {
        public class ItemDto {
            public string Id;
            public string Text;
        }
        
        public string Title;
        public ItemsResponseDto.ItemDto[] ItemsDto;
    }
}