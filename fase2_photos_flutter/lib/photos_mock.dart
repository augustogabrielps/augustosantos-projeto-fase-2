class Photo {
  final int id;
  final int albumId;
  final String title;
  final String url;
  final String thumbnailUrl;
  final DateTime dateTime;

  const Photo({
    required this.id,
    required this.albumId,
    required this.title,
    required this.url,
    required this.thumbnailUrl,
    required this.dateTime,
  });
}

final List<Photo> mockPhotos = [
  Photo(
    id: 1,
    albumId: 1,
    title: "Praia ao entardecer",
    url: "https://picsum.photos/id/1018/600/400",
    thumbnailUrl: "https://picsum.photos/id/1018/200/150",
    dateTime: DateTime.parse("2024-11-01T18:30:00Z"),
  ),
  Photo(
    id: 2,
    albumId: 1,
    title: "Floresta tranquila",
    url: "https://picsum.photos/id/1025/600/400",
    thumbnailUrl: "https://picsum.photos/id/1025/200/150",
    dateTime: DateTime.parse("2024-11-02T09:15:00Z"),
  ),
  Photo(
    id: 3,
    albumId: 2,
    title: "Cidade à noite",
    url: "https://picsum.photos/id/1035/600/400",
    thumbnailUrl: "https://picsum.photos/id/1035/200/150",
    dateTime: DateTime.parse("2024-11-03T21:00:00Z"),
  ),
];
